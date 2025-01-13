package dev.gethealthy.app.models.requests;

import dev.gethealthy.app.models.enums.DayOfWeek;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Time;
import java.time.Instant;
import java.time.LocalTime;

@Data
@Getter
@Setter
public class TrainingScheduleRequest {
    private LocalTime startTime;
    private DayOfWeek dayOfWeek;
    private TrainingProgramScheduleRequest program;
}
