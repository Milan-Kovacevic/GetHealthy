package dev.gethealthy.app.models.responses;

import lombok.Data;

@Data
public class ExerciseSetResponse {
    private Integer id;
    private Integer restTime;
    private String firstMetricValue;
    private String secondMetricValue;
}
