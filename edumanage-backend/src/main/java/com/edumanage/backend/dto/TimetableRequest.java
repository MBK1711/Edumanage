package com.edumanage.backend.dto;

import lombok.Data;

@Data
public class TimetableRequest {
    private String dayOfWeek;
    private String timeSlot;
    private String subject;
    private String room;
    private String sessionType;
    private String roleTarget;
}
