package com.edumanage.backend.controller;

import com.edumanage.backend.dto.AttendanceRequest;
import com.edumanage.backend.entity.Attendance;
import com.edumanage.backend.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    // Teacher marks/updates attendance
    @PostMapping("/record")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<Attendance> markAttendance(@RequestBody AttendanceRequest request) {
        return ResponseEntity.ok(attendanceService.markAttendance(request));
    }

    // Teacher views attendance by course and date
    @GetMapping("/course/{courseId}/date/{date}")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<List<Attendance>> getDailyAttendance(
            @PathVariable Long courseId,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(attendanceService.getAttendanceForCourseAndDate(courseId, date));
    }

    // Teacher views overall attendance by course
    @GetMapping("/course/{courseId}")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<List<Attendance>> getCourseAttendance(@PathVariable Long courseId) {
        return ResponseEntity.ok(attendanceService.getCourseAttendance(courseId));
    }

    // Student views their own attendance
    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasRole('STUDENT') and #studentId == authentication.principal.id or hasRole('TEACHER')")
    public ResponseEntity<List<Attendance>> getStudentAttendance(@PathVariable Long studentId) {
        return ResponseEntity.ok(attendanceService.getStudentAttendance(studentId));
    }
}
