package dev.gethealthy.app.models.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Data
public class PopularityAnalyticsRequest {
    @NotBlank
    private int programId;

    @NotBlank
    private Instant from;

    @NotBlank
    private Instant to;
}
