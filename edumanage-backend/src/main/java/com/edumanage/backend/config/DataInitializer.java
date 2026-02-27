package com.edumanage.backend.config;

import com.edumanage.backend.entity.Department;
import com.edumanage.backend.entity.Role;
import com.edumanage.backend.repository.DepartmentRepository;
import com.edumanage.backend.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.edumanage.backend.entity.Timetable;
import com.edumanage.backend.entity.Attendance;
import com.edumanage.backend.repository.TimetableRepository;
import com.edumanage.backend.repository.AttendanceRepository;

import java.util.Arrays;
import java.util.List;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {

    private final RoleRepository roleRepository;
    private final DepartmentRepository departmentRepository;
    private final TimetableRepository timetableRepository;
    private final AttendanceRepository attendanceRepository;

    @Bean
    public CommandLineRunner initData() {
        return args -> {
            // --- Seed Roles ---
            Arrays.stream(Role.RoleName.values()).forEach(roleName -> {
                if (roleRepository.findByName(roleName).isEmpty()) {
                    roleRepository.save(Role.builder().name(roleName).build());
                    log.info("Initialized role: {}", roleName);
                }
            });

            // --- Seed Departments ---
            List<Department> depts = List.of(
                    Department.builder().code("CSE").name("Computer Science & Eng").icon("💻")
                            .hod("Dr. Anil Mehta").color("indigo").status("Active")
                            .studentCount(320).facultyCount(24).build(),
                    Department.builder().code("IT").name("Information Technology").icon("🌐")
                            .hod("Dr. Priya Sharma").color("sky").status("Active")
                            .studentCount(280).facultyCount(20).build(),
                    Department.builder().code("ECE").name("Electronics & Comm Eng").icon("📡")
                            .hod("Dr. Ramesh Gupta").color("violet").status("Active")
                            .studentCount(240).facultyCount(18).build(),
                    Department.builder().code("EE").name("Electrical Engineering").icon("⚡")
                            .hod("Dr. Sunita Verma").color("amber").status("Active")
                            .studentCount(200).facultyCount(16).build(),
                    Department.builder().code("ME").name("Mechanical Engineering").icon("⚙️")
                            .hod("Dr. Vijay Kumar").color("orange").status("Active")
                            .studentCount(260).facultyCount(22).build(),
                    Department.builder().code("CE").name("Civil Engineering").icon("🏗️")
                            .hod("Dr. Kavita Singh").color("green").status("Active")
                            .studentCount(180).facultyCount(14).build());

            depts.forEach(dept -> {
                if (departmentRepository.findByCode(dept.getCode()).isEmpty()) {
                    departmentRepository.save(dept);
                    log.info("Seeded department: {}", dept.getName());
                }
            });

            // --- Seed Timetable ---
            if (timetableRepository.count() == 0) {
                List<Timetable> schedule = List.of(
                        Timetable.builder().dayOfWeek("Monday").timeSlot("09:00 AM").subject("OS Lab").room("Lab 3")
                                .sessionType("Lab").roleTarget("STUDENT").build(),
                        Timetable.builder().dayOfWeek("Monday").timeSlot("11:00 AM").subject("Computer Networks")
                                .room("Hall A").sessionType("Lecture").roleTarget("STUDENT").build(),
                        Timetable.builder().dayOfWeek("Monday").timeSlot("11:00 AM").subject("Computer Networks")
                                .room("Hall A").sessionType("Lecture").roleTarget("TEACHER").build(),
                        Timetable.builder().dayOfWeek("Tuesday").timeSlot("10:00 AM").subject("Computer Networks")
                                .room("LH 2").sessionType("Lecture").roleTarget("TEACHER").build(),
                        Timetable.builder().dayOfWeek("Wednesday").timeSlot("09:00 AM").subject("Operating Systems")
                                .room("LH 1").sessionType("Lecture").roleTarget("TEACHER").build(),
                        Timetable.builder().dayOfWeek("Wednesday").timeSlot("11:00 AM").subject("CN Lab").room("Lab 5")
                                .sessionType("Lab").roleTarget("STUDENT").build(),
                        Timetable.builder().dayOfWeek("Thursday").timeSlot("10:00 AM").subject("Operating Systems")
                                .room("Room 304").sessionType("Lecture").roleTarget("TEACHER").build());
                timetableRepository.saveAll(schedule);
                log.info("Seeded mock Timetable data");
            }
        };
    }
}
