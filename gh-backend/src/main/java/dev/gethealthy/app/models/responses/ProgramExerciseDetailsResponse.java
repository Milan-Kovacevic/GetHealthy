package dev.gethealthy.app.models.responses;

import lombok.Data;

import java.util.List;

@Data
public class ProgramExerciseDetailsResponse  {
    protected Integer id;
    protected String name;
    protected String description;
    protected String videoLink;
    protected ExerciseMetricResponse firstExerciseMetric;
    protected ExerciseMetricResponse secondExerciseMetric;
    private List<ExerciseSetResponse> exerciseSets;
    protected Integer programExerciseId;
}
