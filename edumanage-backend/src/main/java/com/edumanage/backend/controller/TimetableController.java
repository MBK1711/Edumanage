package com.edumanage.backend.controller;

import com.edumanage.backend.dto.TimetableRequest;
import com.edumanage.backend.entity.Timetable;
import com.edumanage.backend.service.TimetableService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/timetable")
@RequiredArgsConstructor
public class TimetableController {

    private final TimetableService timetableService;

    // Get Teacher Timetable
    @GetMapping("/teacher")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<List<Timetable>> getTeacherTimetable() {
        return ResponseEntity.ok(timetableService.getTimetableByRole("TEACHER"));
    }

    // Get Student Timetable
    @GetMapping("/student")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<Timetable>> getStudentTimetable() {
        return ResponseEntity.ok(timetableService.getTimetableByRole("STUDENT"));
    }

    // Add Session (Admin or Teacher)
    @PostMapping("/add")
    @PreAuthorize("hasRole('TEACHER') or hasRole('ADMIN')")
    public ResponseEntity<Timetable> addSession(@RequestBody TimetableRequest request) {
        return ResponseEntity.ok(timetableService.addSession(request));
    }

    // Delete Session
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('TEACHER') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteSession(@PathVariable Long id) {
        timetableService.deleteSession(id);
        return ResponseEntity.noContent().build();
    }
}
