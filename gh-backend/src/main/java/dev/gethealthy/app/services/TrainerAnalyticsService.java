package dev.gethealthy.app.services;

import dev.gethealthy.app.models.requests.EngagementAnalyticsRequest;
import dev.gethealthy.app.models.requests.PopularityAnalyticsRequest;
import dev.gethealthy.app.models.responses.TrainerDashboardAnalyticsResponse;
import dev.gethealthy.app.models.responses.TrainerEngagementAnalyticsResponse;
import dev.gethealthy.app.models.responses.TrainerPopularityAnalyticsResponse;

public interface TrainerAnalyticsService {
    TrainerDashboardAnalyticsResponse getGeneralAnalytics(int userId);

    TrainerPopularityAnalyticsResponse getPopularityAnalytics(int userId, PopularityAnalyticsRequest request);

    TrainerEngagementAnalyticsResponse getEngagementAnalytics(int userId, EngagementAnalyticsRequest request);
}
