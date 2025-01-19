package dev.gethealthy.app.controllers;

import dev.gethealthy.app.models.requests.ProgressAnalyticsRequest;
import dev.gethealthy.app.models.responses.TraineeDashboardAnalyticsResponse;
import dev.gethealthy.app.models.responses.TraineeProgressAnalyticsResponse;
import dev.gethealthy.app.services.TraineeAnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("${gethealthy.base-url}")
public class TraineeAnalyticsController {

    private final TraineeAnalyticsService traineeAnalyticsService;

    @GetMapping("users/{userId}/trainee-analytics/general")
    public TraineeDashboardAnalyticsResponse getGeneralAnalytics(@PathVariable("userId") int userId) {
        return traineeAnalyticsService.getGeneralAnalytics(userId);
    }

    @PostMapping("users/{userId}/trainee-analytics/engagement")
    public TraineeProgressAnalyticsResponse getEngagementAnalytics(@PathVariable("userId") int userId, @RequestBody ProgressAnalyticsRequest request) {
        return traineeAnalyticsService.getEngagementAnalytics(userId, request);
    }
}
