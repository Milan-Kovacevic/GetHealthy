package dev.gethealthy.app.controllers;

import dev.gethealthy.app.base.CrudController;
import dev.gethealthy.app.models.requests.TrainingProgramRequest;
import dev.gethealthy.app.models.responses.TrainingProgramResponse;
import dev.gethealthy.app.services.TrainingProgramService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${base-url}/training-programs")
public class TrainingProgramController extends CrudController<Integer, TrainingProgramRequest, TrainingProgramResponse> {
    public TrainingProgramController(TrainingProgramService crudService) {
        super(crudService, TrainingProgramResponse.class);
    }
}
