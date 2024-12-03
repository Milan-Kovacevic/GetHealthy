package dev.gethealthy.app.models.requests;

import lombok.Data;

import java.time.LocalTime;

@Data
public class TrainingScheduleRequest {

    private LocalTime startTime;

    private LocalTime endTime;

    private Byte dayOfWeek;

    private Integer programId;

    private Integer userId;
}
