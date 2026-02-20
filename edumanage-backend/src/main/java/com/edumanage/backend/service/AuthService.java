package com.edumanage.backend.service;

import com.edumanage.backend.dto.JwtResponse;
import com.edumanage.backend.dto.LoginRequest;
import com.edumanage.backend.dto.MessageResponse;
import com.edumanage.backend.dto.RegisterRequest;
import com.edumanage.backend.entity.Role;
import com.edumanage.backend.entity.User;
import com.edumanage.backend.repository.RoleRepository;
import com.edumanage.backend.repository.UserRepository;
import com.edumanage.backend.security.JwtUtils;
import com.edumanage.backend.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @Transactional
    public MessageResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            return new MessageResponse("Username is already taken!", false);
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            return new MessageResponse("Email is already in use!", false);
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phone(request.getPhone())
                .build();

        Set<String> strRoles = request.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null || strRoles.isEmpty()) {
            // Default role: STUDENT
            Role studentRole = roleRepository.findByName(Role.RoleName.ROLE_STUDENT)
                    .orElseThrow(() -> new RuntimeException("Error: Role STUDENT is not found."));
            roles.add(studentRole);
        } else {
            strRoles.forEach(role -> {
                switch (role.toLowerCase()) {
                    case "admin" -> {
                        Role adminRole = roleRepository.findByName(Role.RoleName.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role ADMIN is not found."));
                        roles.add(adminRole);
                    }
                    case "teacher", "instructor" -> {
                        Role teacherRole = roleRepository.findByName(Role.RoleName.ROLE_TEACHER)
                                .orElseThrow(() -> new RuntimeException("Error: Role TEACHER is not found."));
                        roles.add(teacherRole);
                    }
                    case "parent", "vendor" -> {
                        Role parentRole = roleRepository.findByName(Role.RoleName.ROLE_PARENT)
                                .orElseThrow(() -> new RuntimeException("Error: Role PARENT is not found."));
                        roles.add(parentRole);
                    }
                    default -> {
                        Role studentRole = roleRepository.findByName(Role.RoleName.ROLE_STUDENT)
                                .orElseThrow(() -> new RuntimeException("Error: Role STUDENT is not found."));
                        roles.add(studentRole);
                    }
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        log.info("User registered successfully: {}", user.getUsername());
        return new MessageResponse("User registered successfully!");
    }

    public JwtResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsernameOrEmail(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        log.info("User logged in successfully: {}", userDetails.getUsername());

        return JwtResponse.builder()
                .token(jwt)
                .type("Bearer")
                .id(userDetails.getId())
                .username(userDetails.getUsername())
                .email(userDetails.getEmail())
                .firstName(userDetails.getFirstName())
                .lastName(userDetails.getLastName())
                .roles(roles)
                .build();
    }
}
