package com.edumanage.backend.service;

import com.edumanage.backend.dto.TimetableRequest;
import com.edumanage.backend.entity.Timetable;
import com.edumanage.backend.repository.TimetableRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TimetableService {

    private final TimetableRepository timetableRepository;

    public List<Timetable> getTimetableByRole(String role) {
        return timetableRepository.findByRoleTarget(role.toUpperCase());
    }

    public Timetable addSession(TimetableRequest request) {
        Timetable ts = Timetable.builder()
                .dayOfWeek(request.getDayOfWeek())
                .timeSlot(request.getTimeSlot())
                .subject(request.getSubject())
                .room(request.getRoom())
                .sessionType(request.getSessionType())
                .roleTarget(request.getRoleTarget().toUpperCase())
                .build();
        return timetableRepository.save(ts);
    }

    public void deleteSession(Long id) {
        timetableRepository.deleteById(id);
    }
}
