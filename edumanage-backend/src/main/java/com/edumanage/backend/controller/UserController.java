package com.edumanage.backend.controller;

import com.edumanage.backend.entity.User;
import com.edumanage.backend.security.UserDetailsImpl;
import com.edumanage.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {

    private final UserService userService;

    // Get current user profile
    @GetMapping("/profile")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        User user = userService.getUserById(userDetails.getId());
        return ResponseEntity.ok(user);
    }

    // Admin: get all users
    @GetMapping("/admin/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // Admin: get user by ID
    @GetMapping("/admin/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    // Admin: toggle user activation
    @PatchMapping("/admin/users/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> toggleUserStatus(@PathVariable Long id,
            @RequestParam boolean active) {
        userService.setUserActive(id, active);
        return ResponseEntity.ok("User status updated");
    }

    // Admin: delete user
    @DeleteMapping("/admin/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted");
    }

    // Role-specific test endpoints
    @GetMapping("/admin/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> adminDashboard() {
        return ResponseEntity.ok("Welcome to Admin Dashboard");
    }

    @GetMapping("/instructor/dashboard")
    @PreAuthorize("hasAnyRole('ADMIN','INSTRUCTOR')")
    public ResponseEntity<?> instructorDashboard() {
        return ResponseEntity.ok("Welcome to Instructor Dashboard");
    }

    @GetMapping("/vendor/dashboard")
    @PreAuthorize("hasAnyRole('ADMIN','VENDOR')")
    public ResponseEntity<?> vendorDashboard() {
        return ResponseEntity.ok("Welcome to Vendor Dashboard");
    }

    @GetMapping("/student/dashboard")
    @PreAuthorize("hasAnyRole('ADMIN','INSTRUCTOR','STUDENT')")
    public ResponseEntity<?> studentDashboard() {
        return ResponseEntity.ok("Welcome to Student Dashboard");
    }
}
