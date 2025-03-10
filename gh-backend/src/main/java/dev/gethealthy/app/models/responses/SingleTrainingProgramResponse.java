package dev.gethealthy.app.models.responses;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class SingleTrainingProgramResponse extends TrainingProgramResponse {
    private Integer totalRates;
    private String requirements;
    private Integer trainingDuration;
    private List<ProgramExerciseDetailsResponse> exercises;
}
