package com.edumanage.backend.service;

import com.edumanage.backend.entity.Course;
import com.edumanage.backend.entity.Department;
import com.edumanage.backend.repository.CourseRepository;
import com.edumanage.backend.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final CourseRepository courseRepository;

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Optional<Department> getDepartmentById(Long id) {
        return departmentRepository.findById(id);
    }

    @Transactional
    public Department createOrUpdateDepartment(Department department) {
        return departmentRepository.save(department);
    }

    @Transactional
    public Course addCourseToDepartment(Long departmentId, Course course) {
        Department dept = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new RuntimeException("Error: Department not found"));

        course.setDepartment(dept);
        return courseRepository.save(course);
    }

    public List<Course> getCoursesByDepartment(Long departmentId) {
        return courseRepository.findByDepartmentId(departmentId);
    }

    @Transactional
    public void deleteDepartment(Long id) {
        departmentRepository.deleteById(id);
    }
}
