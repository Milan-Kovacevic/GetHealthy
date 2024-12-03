package dev.gethealthy.app.models.responses;

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
