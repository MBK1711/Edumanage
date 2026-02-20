package com.edumanage.backend.config;

import com.edumanage.backend.security.AuthEntryPointJwt;
import com.edumanage.backend.security.AuthTokenFilter;
import com.edumanage.backend.security.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {

        private final UserDetailsServiceImpl userDetailsService;
        private final AuthEntryPointJwt unauthorizedHandler;
        private final AuthTokenFilter authTokenFilter;

        @Value("${app.cors.allowed-origins}")
        private String allowedOrigins;

        @Bean
        public DaoAuthenticationProvider authenticationProvider() {
                DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
                authProvider.setUserDetailsService(userDetailsService);
                authProvider.setPasswordEncoder(passwordEncoder());
                return authProvider;
        }

        @Bean
        public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
                return authConfig.getAuthenticationManager();
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
                http
                                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                                .csrf(csrf -> csrf.disable())
                                .exceptionHandling(ex -> ex.authenticationEntryPoint(unauthorizedHandler))
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers(
                                                                org.springframework.security.web.util.matcher.AntPathRequestMatcher
                                                                                .antMatcher("/api/auth/**"))
                                                .permitAll()
                                                .requestMatchers(
                                                                org.springframework.security.web.util.matcher.AntPathRequestMatcher
                                                                                .antMatcher("/api/public/**"))
                                                .permitAll()
                                                .requestMatchers(
                                                                org.springframework.security.web.util.matcher.AntPathRequestMatcher
                                                                                .antMatcher("/api/admin/**"))
                                                .hasRole("ADMIN")
                                                .requestMatchers(
                                                                org.springframework.security.web.util.matcher.AntPathRequestMatcher
                                                                                .antMatcher("/api/instructor/**"))
                                                .hasAnyRole("ADMIN", "INSTRUCTOR")
                                                .requestMatchers(
                                                                org.springframework.security.web.util.matcher.AntPathRequestMatcher
                                                                                .antMatcher("/api/vendor/**"))
                                                .hasAnyRole("ADMIN", "VENDOR")
                                                .requestMatchers(
                                                                org.springframework.security.web.util.matcher.AntPathRequestMatcher
                                                                                .antMatcher("/api/student/**"))
                                                .hasAnyRole("ADMIN", "INSTRUCTOR", "STUDENT")
                                                .anyRequest().authenticated());

                http.authenticationProvider(authenticationProvider());
                http.addFilterBefore(authTokenFilter, UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();
                configuration.setAllowedOrigins(Arrays.asList(allowedOrigins.split(",")));
                configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
                configuration.setAllowedHeaders(List.of("*"));
                configuration.setAllowCredentials(true);
                configuration.setMaxAge(3600L);

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
        }
}
