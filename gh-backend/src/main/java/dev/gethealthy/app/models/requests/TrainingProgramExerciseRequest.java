package dev.gethealthy.app.models.requests;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class TrainingProgramExerciseRequest {
    private Integer exerciseId;
    private Integer position;
    private Integer programId;
}
