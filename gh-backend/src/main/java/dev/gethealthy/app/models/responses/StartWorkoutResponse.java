package dev.gethealthy.app.models.responses;

import lombok.Data;

import java.time.Instant;

@Data
public class StartWorkoutResponse {
    private int traineeExercisingId;
    private Instant dateTaken;
}
