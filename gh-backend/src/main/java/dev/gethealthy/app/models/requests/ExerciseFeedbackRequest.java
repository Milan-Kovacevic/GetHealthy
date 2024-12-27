package dev.gethealthy.app.models.requests;

import lombok.Data;

@Data
public class ExerciseFeedbackRequest {
    private Boolean skipped;
    private Integer TraineeExercisingId;
    private Integer ExerciseId;
    private Integer ProgramExerciseId;
}
