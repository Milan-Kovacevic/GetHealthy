package dev.gethealthy.app.models.requests;

import dev.gethealthy.app.models.enums.DayOfWeek;
import lombok.Data;

import java.time.LocalTime;

@Data
public class TrainingScheduleRequest {
    private LocalTime startTime;

    private DayOfWeek dayOfWeek;

    private Integer programId;
}
