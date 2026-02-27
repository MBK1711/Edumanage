package com.edumanage.backend.service;

import com.edumanage.backend.dto.AttendanceRequest;
import com.edumanage.backend.entity.Attendance;
import com.edumanage.backend.entity.Course;
import com.edumanage.backend.entity.User;
import com.edumanage.backend.repository.AttendanceRepository;
import com.edumanage.backend.repository.CourseRepository;
import com.edumanage.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    @Transactional
    public Attendance markAttendance(AttendanceRequest request) {
        User student = userRepository.findById(request.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Optional<Attendance> existing = attendanceRepository.findByStudentIdAndCourseIdAndDate(
                student.getId(), course.getId(), request.getDate());

        if (existing.isPresent()) {
            Attendance att = existing.get();
            att.setStatus(request.getStatus().toUpperCase());
            return attendanceRepository.save(att);
        }

        Attendance newAtt = Attendance.builder()
                .student(student)
                .course(course)
                .date(request.getDate())
                .status(request.getStatus().toUpperCase())
                .build();

        return attendanceRepository.save(newAtt);
    }

    public List<Attendance> getAttendanceForCourseAndDate(Long courseId, LocalDate date) {
        return attendanceRepository.findByCourseIdAndDate(courseId, date);
    }

    public List<Attendance> getStudentAttendance(Long studentId) {
        return attendanceRepository.findByStudentId(studentId);
    }

    public List<Attendance> getCourseAttendance(Long courseId) {
        return attendanceRepository.findByCourseId(courseId);
    }
}
