package dev.gethealthy.app.models.requests;

import lombok.*;

import java.time.Instant;

@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProgressAnalyticsRequest {
    private Instant from;
    private Instant to;
    private int exerciseId;
}
