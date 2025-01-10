package dev.gethealthy.app.controllers;

import dev.gethealthy.app.models.requests.EngagementAnalyticsRequest;
import dev.gethealthy.app.models.requests.PopularityAnalyticsRequest;
import dev.gethealthy.app.models.responses.TrainerDashboardAnalyticsResponse;
import dev.gethealthy.app.models.responses.TrainerEngagementAnalyticsResponse;
import dev.gethealthy.app.models.responses.TrainerPopularityAnalyticsResponse;
import dev.gethealthy.app.services.TrainerAnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("${gethealthy.base-url}")
public class TrainerAnalyticsController {

    private final TrainerAnalyticsService trainerAnalyticsService;

    @GetMapping("users/{userId}/analytics/general")
    public TrainerDashboardAnalyticsResponse getGeneralAnalytics(@PathVariable("userId") int userId) {
        return trainerAnalyticsService.getGeneralAnalytics(userId);
    }

    @PostMapping("users/{userId}/analytics/popularity")
    public TrainerPopularityAnalyticsResponse getPopularityAnalytics(@PathVariable("userId") int userId, @RequestBody PopularityAnalyticsRequest request)
    {
        return trainerAnalyticsService.getPopularityAnalytics(userId, request);
    }

    @PostMapping("users/{userId}/analytics/engagement")
    public TrainerEngagementAnalyticsResponse getEngagementAnalytics(@PathVariable("userId") int userId, @RequestBody EngagementAnalyticsRequest request)
    {
        return  trainerAnalyticsService.getEngagementAnalytics(userId, request);
    }
}
