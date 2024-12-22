package dev.gethealthy.app.models.responses;

import lombok.Data;

import java.util.List;

@Data
public class ProgramExerciseResponse {
    private Integer id;
    private String name;
    private String description;
    private String videoLink;
    private ExerciseMetricResponse firstExerciseMetric;
    private ExerciseMetricResponse secondExerciseMetric;
    private List<ExerciseSetResponse> exerciseSets;
}
