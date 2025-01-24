package dev.gethealthy.app.models.requests;

import lombok.Data;

@Data
public class ExerciseRequest {
    private String exerciseName;

    private String description;

    private String videoLink;

    private Integer firstExerciseMetricId;

    private Integer secondExerciseMetricId;
}
