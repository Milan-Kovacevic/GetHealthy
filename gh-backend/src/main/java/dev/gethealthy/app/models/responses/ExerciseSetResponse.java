package dev.gethealthy.app.models.responses;

import lombok.Data;

@Data
public class ExerciseSetResponse {
    protected Integer id;
    protected Integer restTime;
    protected String firstMetricValue;
    protected String secondMetricValue;
}
