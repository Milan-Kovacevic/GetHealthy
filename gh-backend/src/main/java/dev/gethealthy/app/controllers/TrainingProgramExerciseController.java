package dev.gethealthy.app.controllers;

import dev.gethealthy.app.base.CrudController;
import dev.gethealthy.app.base.CrudService;
import dev.gethealthy.app.models.requests.TrainingProgramExerciseRequest;
import dev.gethealthy.app.models.requests.TrainingProgramRequest;
import dev.gethealthy.app.models.responses.TrainingProgramResponse;
import dev.gethealthy.app.services.TrainingProgramExerciseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${gethealthy.base-url}/training-program-exercises")
public class TrainingProgramExerciseController  {
    TrainingProgramExerciseService crudService;

    public TrainingProgramExerciseController(TrainingProgramExerciseService crudService) {
        this.crudService = crudService;
    }

    @PostMapping
    public void addExercisesToTrainingProgram(@RequestBody List<TrainingProgramExerciseRequest> requests)
    {
        for (var request : requests)
        {
            crudService.insert(request, TrainingProgramExerciseRequest.class);
        }
    }
}
