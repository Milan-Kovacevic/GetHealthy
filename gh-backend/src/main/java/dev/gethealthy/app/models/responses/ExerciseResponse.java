package dev.gethealthy.app.models.responses;

import dev.gethealthy.app.repositories.MetricsRepository;
import lombok.Data;

@Data
public class ExerciseResponse {
    private Integer id;
    private String exerciseName;
    private String description;
    private String videoLink;
    private MetricsResponse firstExerciseMetric;
    private MetricsResponse secondExerciseMetric;
}
