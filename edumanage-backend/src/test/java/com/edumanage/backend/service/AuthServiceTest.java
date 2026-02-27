package com.edumanage.backend.service;

import com.edumanage.backend.dto.MessageResponse;
import com.edumanage.backend.dto.RegisterRequest;
import com.edumanage.backend.entity.Role;
import com.edumanage.backend.entity.User;
import com.edumanage.backend.repository.RoleRepository;
import com.edumanage.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthService authService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRegisterUser_Success() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("testuser");
        request.setEmail("test@test.com");
        request.setPassword("password123");
        request.setRoles(Set.of("student"));

        Role studentRole = new Role();
        studentRole.setName(Role.RoleName.ROLE_STUDENT);

        when(userRepository.existsByUsername(anyString())).thenReturn(false);
        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("hashed_password");
        when(roleRepository.findByName(Role.RoleName.ROLE_STUDENT)).thenReturn(Optional.of(studentRole));

        MessageResponse response = authService.register(request);

        assertNotNull(response);
        assertTrue(response.isSuccess());
        assertEquals("User registered successfully!", response.getMessage());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testRegisterUser_UsernameAlreadyExists() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("existinguser");

        when(userRepository.existsByUsername("existinguser")).thenReturn(true);

        MessageResponse response = authService.register(request);

        assertFalse(response.isSuccess());
        assertEquals("Username is already taken!", response.getMessage());
        verify(userRepository, never()).save(any(User.class));
    }
}
