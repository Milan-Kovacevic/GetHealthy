package dev.gethealthy.app.models.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Data
public class EngagementAnalyticsRequest {
    @NotBlank
    private Instant from;
    @NotBlank
    private Instant to;
    @NotBlank
    private int programId;
    @NotBlank
    private int exerciseId;

    private Integer traineeId;
}
