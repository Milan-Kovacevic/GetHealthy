package dev.gethealthy.app.models.responses;

import lombok.Data;

import java.time.LocalTime;

@Data
public class TrainingScheduleResponse {

    private Integer id;

    private LocalTime startTime;

    private LocalTime endTime;

    private Byte dayOfWeek;

    private Integer programId;

    private Integer userId;
}
