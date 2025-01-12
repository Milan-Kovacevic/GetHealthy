package dev.gethealthy.app.models.responses;

import lombok.Data;

@Data
public class ExerciseListingResponse {
    private Integer id;
    private String exerciseName;
    private MetricsResponse firstExerciseMetric;
    private MetricsResponse secondExerciseMetric;
}
