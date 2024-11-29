package dev.gethealthy.app.models.responses;

import dev.gethealthy.app.models.entities.MetricType;
import dev.gethealthy.app.models.entities.Trainer;
import lombok.Data;

@Data
public class ExerciseResponse {
    private Integer id;

    private String exerciseName;

    private String description;

    private String videoLink;

    private Integer userId;

    private Integer metricType1Id;

    private Integer matricType2Id;
}
