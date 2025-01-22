package dev.gethealthy.app.models.requests;

import lombok.Data;

@Data
public class AddExerciseSetRequest {
    private Integer restTime;
    private String firstMetricValue;
    private String secondMetricValue;
}
