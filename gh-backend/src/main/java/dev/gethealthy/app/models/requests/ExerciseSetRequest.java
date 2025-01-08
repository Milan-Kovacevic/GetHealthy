package dev.gethealthy.app.models.requests;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class ExerciseSetRequest {
    private Integer programExerciseId;
    private Integer restTime;
    private String firstMetricValue;
    private String secondMetricValue;
}
