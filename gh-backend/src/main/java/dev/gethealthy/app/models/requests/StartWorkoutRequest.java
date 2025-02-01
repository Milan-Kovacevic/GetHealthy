package dev.gethealthy.app.models.requests;

import lombok.Data;

@Data
public class StartWorkoutRequest {
    private Integer programScheduleId;
    private Integer traineeId;
}
