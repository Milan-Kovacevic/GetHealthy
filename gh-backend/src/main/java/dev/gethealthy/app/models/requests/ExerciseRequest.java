package dev.gethealthy.app.models.requests;

import dev.gethealthy.app.models.entities.MetricType;
import dev.gethealthy.app.models.entities.Trainer;
import lombok.Data;

@Data
public class ExerciseRequest {
    private String exerciseName;

    private String description;

    private String videoLink;

    private Trainer user;

    private MetricType metricType1Id;

    private MetricType matricType2Id;
}
