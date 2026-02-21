package com.edumanage.backend.controller;

import com.edumanage.backend.entity.Course;
import com.edumanage.backend.entity.Department;
import com.edumanage.backend.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class DepartmentController {

    private final DepartmentService departmentService;

    // Open Endpoint: Fetch list of departments (Students, Teachers, Admin can all
    // see)
    @GetMapping
    public ResponseEntity<List<Department>> getAllDepartments() {
        return ResponseEntity.ok(departmentService.getAllDepartments());
    }

    // Get specific department
    @GetMapping("/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable Long id) {
        return departmentService.getDepartmentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Admin Only: Create/Edit a Department
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Department> createDepartment(@RequestBody Department department) {
        return ResponseEntity.ok(departmentService.createOrUpdateDepartment(department));
    }

    // Admin Only: Delete a Department
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteDepartment(@PathVariable Long id) {
        departmentService.deleteDepartment(id);
        return ResponseEntity.ok().build();
    }

    // --- Course Sub-Routing ---
    @GetMapping("/{id}/courses")
    public ResponseEntity<List<Course>> getCoursesForDepartment(@PathVariable Long id) {
        return ResponseEntity.ok(departmentService.getCoursesByDepartment(id));
    }

    // Admin Only: Add Course to Department syllabus
    @PostMapping("/{id}/courses")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Course> addCourseToDepartment(@PathVariable Long id, @RequestBody Course course) {
        return ResponseEntity.ok(departmentService.addCourseToDepartment(id, course));
    }
}
