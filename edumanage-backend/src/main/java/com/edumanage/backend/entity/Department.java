package com.edumanage.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "departments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String code; // e.g. "CSE"

    @Column(nullable = false)
    private String name; // e.g. "Computer Science & Engineering"

    private String icon;
    private String hod;
    private String color;
    private String status;

    private Integer studentCount;
    private Integer facultyCount;

    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL)
    private List<Course> courses;

    // To prevent infinite recursion in JSON
    @Override
    public String toString() {
        return "Department{" + "id=" + id + ", name='" + name + '\'' + '}';
    }
}
