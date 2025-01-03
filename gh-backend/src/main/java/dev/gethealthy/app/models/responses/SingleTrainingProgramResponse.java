package dev.gethealthy.app.models.responses;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class SingleTrainingProgramResponse extends TrainingProgramResponse {
    private int currentlyEnrolled;
    private int totalRates;
    List<ExerciseResponse> exercises;
}
