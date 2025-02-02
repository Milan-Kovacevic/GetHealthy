package dev.gethealthy.app.services;


import dev.gethealthy.app.models.requests.ProgressAnalyticsRequest;
import dev.gethealthy.app.models.responses.TraineeDashboardAnalyticsResponse;
import dev.gethealthy.app.models.responses.TraineeProgressAnalyticsResponse;

public interface TraineeAnalyticsService {
    TraineeDashboardAnalyticsResponse getGeneralAnalytics(int userId);

    TraineeProgressAnalyticsResponse getEngagementAnalytics(int userId, ProgressAnalyticsRequest request);
}
