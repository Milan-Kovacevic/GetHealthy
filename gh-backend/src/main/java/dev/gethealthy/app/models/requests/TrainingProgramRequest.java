package dev.gethealthy.app.models.requests;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class TrainingProgramRequest {
    private String name;

    private Byte difficulty;

    private Integer trainingDuration;

    private String description;

    private String requirements;
}
