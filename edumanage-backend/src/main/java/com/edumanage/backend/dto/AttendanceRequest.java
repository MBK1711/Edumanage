package com.edumanage.backend.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AttendanceRequest {
    private Long studentId;
    private Long courseId;
    private LocalDate date;
    private String status; // PRESENT, ABSENT, LATE
}
