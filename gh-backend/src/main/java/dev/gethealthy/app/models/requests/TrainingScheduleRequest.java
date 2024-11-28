package dev.gethealthy.app.models.requests;

import dev.gethealthy.app.models.entities.Trainer;
import dev.gethealthy.app.models.entities.TrainingProgram;
import lombok.Data;

import java.time.LocalTime;

@Data
public class TrainingScheduleRequest {

    private LocalTime startTime;

    private LocalTime endTime;

    private Byte dayOfWeek;

    private TrainingProgram program;

    private Trainer user;
}
