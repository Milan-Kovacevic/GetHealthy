package dev.gethealthy.app.services;

import dev.gethealthy.app.base.CrudService;
import dev.gethealthy.app.models.responses.MetricsResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MetricsService extends CrudService<Integer> {
    Page<MetricsResponse> getPageableExerciseMetrics(Pageable page);
}