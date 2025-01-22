package dev.gethealthy.app.models.responses;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TraineeDashboardAnalyticsResponse {
    @Getter
    @Setter
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TotalJoinedProgramsData
    {
        private long interacted;
        private long nonInteracted;
    }

    @Getter
    @Setter
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TopProgramsDashboardData
    {
        private String program;
        private long value;
    }

    @Getter
    @Setter
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TopExerciseDashboardData
    {
        private String exercise;
        private long value;
    }

    private List<TotalJoinedProgramsData> totalJoined;
    private List<TopProgramsDashboardData> topInteractedPrograms;
    private List<TopExerciseDashboardData> topSkippedExercises;
    private List<TopExerciseDashboardData> topFavoriteExercises;
}
