package dev.gethealthy.app.models.responses;

import lombok.*;

import java.time.Instant;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
public class TrainerEngagementAnalyticsResponse {
    private List<AnalyticsEngagementData> data;

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    @Data
    public static class AnalyticsEngagementData
    {
            private Instant date;
            private double skipped;
            private double completed;
    }
}
