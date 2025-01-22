package dev.gethealthy.app.models.responses;

import lombok.*;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TrainerPopularityAnalyticsResponse {
    private List<AnalyticsPopularityData> ratings;
    private List<AnalyticsPopularityData> totalParticipants;

    @Getter
    @Setter
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AnalyticsPopularityData
    {
        private Instant date;
        private double value;
    }
}
