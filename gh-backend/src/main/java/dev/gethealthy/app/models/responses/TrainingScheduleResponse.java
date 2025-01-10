package dev.gethealthy.app.models.responses;

import lombok.Data;

import java.time.LocalTime;

@Data
public class TrainingScheduleResponse {

    private Integer id;

    private LocalTime startTime;

    private Byte dayOfWeek;

    private Integer programId;
}
