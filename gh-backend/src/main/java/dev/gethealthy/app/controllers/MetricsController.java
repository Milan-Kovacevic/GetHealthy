package dev.gethealthy.app.controllers;

import dev.gethealthy.app.base.CrudController;
import dev.gethealthy.app.models.requests.MetricsRequest;
import dev.gethealthy.app.models.responses.MetricsResponse;
import dev.gethealthy.app.services.MetricsService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${gethealthy.base-url}/metrics")
public class MetricsController extends CrudController<Integer, MetricsRequest, MetricsResponse> {
    private final MetricsService metricsService;

    public MetricsController(MetricsService crudService) {
        super(crudService, MetricsResponse.class);
        this.metricsService = crudService;
    }

    @GetMapping("filter")
    public Page<MetricsResponse> getPageableMetrics(Pageable page) {
        return metricsService.getPageableExerciseMetrics(page);
    }
}
