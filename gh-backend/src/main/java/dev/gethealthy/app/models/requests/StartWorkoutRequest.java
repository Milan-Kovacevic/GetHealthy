package dev.gethealthy.app.models.requests;

import lombok.Data;

@Data
public class StartWorkoutRequest {
    private Integer programId;
    private Integer userId;
}
