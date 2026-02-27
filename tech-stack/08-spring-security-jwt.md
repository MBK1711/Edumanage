# 🔐 Spring Security + JJWT — Authentication & Authorization

---

## What is it?
**Spring Security** protects all API endpoints and handles authentication.
**JJWT (Java JWT)** creates and validates JSON Web Tokens — the stateless
login mechanism used between the React frontend and the backend.

---

## Where is it used?
```
edumanage-backend/src/main/java/com/edumanage/backend/
├── security/
│   ├── SecurityConfig.java         ← Defines which routes are public vs protected
│   ├── JwtUtils.java               ← Creates & validates JWT tokens
│   ├── JwtAuthFilter.java          ← Intercepts every request to check the token
│   ├── UserDetailsServiceImpl.java ← Loads user from DB for Spring Security
│   └── AuthEntryPoint.java         ← Returns 401 Unauthorized on invalid token
├── controller/
│   └── AuthController.java         ← /api/auth/login, /api/auth/register
└── dto/
    ├── LoginRequest.java           ← { username, password }
    └── JwtResponse.java            ← { token, type, id, username, roles }
```

---

## Why Spring Security + JWT?
| Reason | Explanation |
|--------|-------------|
| **Stateless auth** | No server-side session — the token carries all user info, scales horizontally |
| **Role-based access** | `@PreAuthorize("hasRole('ADMIN')")` on any method restricts access by role |
| **BCrypt hashing** | Passwords are never stored in plain text — hashed with salt factor 10 |
| **Industry standard** | JWT is used in virtually every modern REST API for authentication |
| **Filter chain** | Every request automatically goes through the JWT filter before reaching controllers |

---

## How it's used in this project

### 1. SecurityConfig — the security rulebook
```java
@Configuration
@EnableMethodSecurity   // enables @PreAuthorize
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())             // REST APIs don't need CSRF
            .sessionManagement(sess ->
                sess.sessionCreationPolicy(STATELESS)) // No sessions — JWT only
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()  // Login/register = public
                .anyRequest().authenticated()                 // Everything else = needs token
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();   // Hashes passwords with salt
    }
}
```

### 2. JwtUtils — creates and reads tokens
```java
@Component
public class JwtUtils {
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private int jwtExpirationMs;   // e.g. 86400000 = 24 hours

    // Called at login — creates a signed token
    public String generateJwtToken(Authentication authentication) {
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();
    }

    // Called on every request — reads the username from the token
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build()
            .parseClaimsJws(token).getBody().getSubject();
    }

    // Validates the token is not expired or tampered with
    public boolean validateJwtToken(String authToken) { ... }
}
```

### 3. JwtAuthFilter — runs before every controller
```java
@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(request, response, filterChain) {
        String token = parseJwt(request);   // reads Authorization header
        if (token != null && jwtUtils.validateJwtToken(token)) {
            String username = jwtUtils.getUserNameFromJwtToken(token);
            UserDetails user = userDetailsService.loadUserByUsername(username);
            // Sets the authenticated user in Spring Security's context
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
        filterChain.doFilter(request, response);  // pass to controller
    }
}
```

### 4. Login flow (full)
```
React POST /api/auth/login { username, password }
    → AuthController.authenticateUser()
    → AuthenticationManager.authenticate()
    → UserDetailsServiceImpl.loadUserByUsername()  ← loads from DB
    → BCryptPasswordEncoder.matches()              ← compares passwords
    → JwtUtils.generateJwtToken()                  ← creates JWT
    → Returns: { token: "eyJ...", role: "ROLE_ADMIN" }
    → React stores token in localStorage
```

### 5. Protected endpoint
```java
@GetMapping
@PreAuthorize("hasRole('ADMIN')")     // 403 if not admin
public ResponseEntity<List<User>> getAllUsers() { ... }
```

### 6. Token in the Authorization header
```
GET /api/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
JWT payload contains: `{ "sub": "username", "iat": 1708000000, "exp": 1708086400 }`
