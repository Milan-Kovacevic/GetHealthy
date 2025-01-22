package dev.gethealthy.app.models.responses;

import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TrainerDashboardAnalyticsResponse {
    @Getter
    @Setter
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TopProgramDashboardData {
        private String program;
        private double value;
    }
    @Getter
    @Setter
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TotalProgramDashboardData
    {
        private long beginner;
        private long intermediate;
        private long advanced;
    }

    private List<TopProgramDashboardData> topInteracted;
    private List<TopProgramDashboardData> topJoined;
    private List<TopProgramDashboardData> topVoted;
    private List<TotalProgramDashboardData> totalPrograms;
}


