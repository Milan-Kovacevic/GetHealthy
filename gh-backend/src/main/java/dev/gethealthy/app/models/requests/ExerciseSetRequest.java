package dev.gethealthy.app.models.requests;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ExerciseSetRequest {
    private Integer programExericseId;
    private Integer restTime;
    private String firstMetricValue;
    private String secondMetricValue;
}
