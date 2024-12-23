package dev.gethealthy.app.controllers;

import dev.gethealthy.app.base.CrudController;
import dev.gethealthy.app.models.requests.TrainingScheduleRequest;
import dev.gethealthy.app.models.responses.TrainingScheduleResponse;
import dev.gethealthy.app.services.TrainingScheduleService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${gethealthy.base-url}/schedules")
public class TrainingScheduleController extends CrudController<Integer, TrainingScheduleRequest, TrainingScheduleResponse> {
    // TODO ...
    public TrainingScheduleController(TrainingScheduleService crudService) {
        super(crudService, TrainingScheduleResponse.class);
    }
}
