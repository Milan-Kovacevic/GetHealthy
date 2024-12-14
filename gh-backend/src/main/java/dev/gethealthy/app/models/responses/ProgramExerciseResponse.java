package dev.gethealthy.app.models.responses;

import lombok.Data;

@Data
public class ProgramExerciseResponse {
    private Integer id;
    private Integer position;
    private String name;
    private String description;
    private String videoLink;
    private ExerciseMetricResponse firstExerciseMetric;
    private ExerciseMetricResponse secondExerciseMetric;
}
