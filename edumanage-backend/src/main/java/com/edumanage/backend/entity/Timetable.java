package com.edumanage.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "timetable")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Timetable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 15)
    private String dayOfWeek;

    @Column(nullable = false, length = 20)
    private String timeSlot;

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false)
    private String room;

    @Column(nullable = false, length = 50)
    private String sessionType; // Lecture, Lab, Tutorial, Meeting, etc.

    @Column(nullable = false)
    private String roleTarget; // TEACHER or STUDENT
}
