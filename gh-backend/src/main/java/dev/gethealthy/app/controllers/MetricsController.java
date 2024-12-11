package dev.gethealthy.app.controllers;

import dev.gethealthy.app.base.CrudController;
import dev.gethealthy.app.models.requests.MetricsRequest;
import dev.gethealthy.app.models.responses.MetricsResponse;
import dev.gethealthy.app.services.MetricsService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${gethealthy.base-url}/metrics")
public class MetricsController extends CrudController<Integer, MetricsRequest, MetricsResponse> {
    public MetricsController(MetricsService crudService) {
        super(crudService, MetricsResponse.class);
    }
}
