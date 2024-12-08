package dev.gethealthy.app.controllers;

import dev.gethealthy.app.base.CrudController;
import dev.gethealthy.app.models.requests.ExerciseRequest;
import dev.gethealthy.app.models.responses.ExerciseResponse;
import dev.gethealthy.app.services.ExerciseService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${gethealthy.base-url}/exercises")
public class ExerciseController extends CrudController<Integer, ExerciseRequest, ExerciseResponse> {
    public ExerciseController(ExerciseService crudService) {
        super(crudService, ExerciseResponse.class);
    }
}
