package dev.gethealthy.app.models.responses;

import lombok.*;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TraineeProgressAnalyticsResponse {

    @Getter
    @Setter
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TraineeProgressData
    {
        private Instant date;
        private double firstMetric;
        private double secondMetric;
    }

    private List<TraineeProgressData> data;
}
