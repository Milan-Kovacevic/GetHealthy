package dev.gethealthy.app.controllers;

import dev.gethealthy.app.base.CrudController;
import dev.gethealthy.app.models.requests.ExerciseRequest;
import dev.gethealthy.app.models.responses.ExerciseListingResponse;
import dev.gethealthy.app.models.responses.ExerciseResponse;
import dev.gethealthy.app.models.responses.ProgramListingResponse;
import dev.gethealthy.app.models.responses.TrainingProgramResponse;
import dev.gethealthy.app.services.ExerciseService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${gethealthy.base-url}/exercises")
public class ExerciseController extends CrudController<Integer, ExerciseRequest, ExerciseResponse> {
    private final ExerciseService exerciseService;
    public ExerciseController(ExerciseService exerciseService) {
        super(exerciseService, ExerciseResponse.class);
        this.exerciseService = exerciseService;
    }

    @GetMapping("filter")
    public Page<ExerciseResponse> getAllExerciseFiltered(@RequestParam(defaultValue = "") String query, Pageable page) {
        return exerciseService.getAllExercisesFiltered(page, query);
    }

    @GetMapping("brief")
    public Page<ExerciseListingResponse> getExercisesListed(Pageable page) {
        return exerciseService.getExercisesListed(page);
    }
}
