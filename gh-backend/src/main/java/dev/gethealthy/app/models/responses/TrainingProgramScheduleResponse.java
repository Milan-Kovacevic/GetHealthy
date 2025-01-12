package dev.gethealthy.app.models.responses;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Data
@Getter
@Setter
public class TrainingProgramScheduleResponse {
    private int id;
    private String name;
    private Instant createdAt;
    private String description;
    private int trainingDuration;
    private String trainerName;
}
