package dev.gethealthy.app.models.requests;

import lombok.Data;

@Data
public class ExerciseFeedbackRequest {
    private Boolean skipped;
    private Integer traineeExercisingId;
    private Integer exerciseId;
    private Integer programExerciseId;
}
