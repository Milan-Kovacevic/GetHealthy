package dev.gethealthy.app.controllers;

import dev.gethealthy.app.base.CrudController;
import dev.gethealthy.app.base.CrudService;
import dev.gethealthy.app.models.entities.ExerciseSet;
import dev.gethealthy.app.models.entities.TrainingProgramExercise;
import dev.gethealthy.app.models.requests.TrainingProgramExerciseRequest;
import dev.gethealthy.app.models.requests.TrainingProgramExercisesRequest;
import dev.gethealthy.app.models.requests.TrainingProgramRequest;
import dev.gethealthy.app.models.responses.ProgramExerciseResponse;
import dev.gethealthy.app.models.responses.TrainingProgramResponse;
import dev.gethealthy.app.services.ExerciseSetService;
import dev.gethealthy.app.services.TrainingProgramExerciseService;
import dev.gethealthy.app.services.ExerciseSetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${gethealthy.base-url}/training-programs")
public class TrainingProgramExerciseController  {
    private final TrainingProgramExerciseService trainingProgramExerciseService;

    @GetMapping("{programId}/exercises")
    public List<ProgramExerciseResponse> getTrainingProgramExercises(@PathVariable(name = "programId") Integer programId) {
        return trainingProgramExerciseService.getTrainingProgramExercises(programId);
    }

    @PutMapping(path = "{programId}/exercises")
    @ResponseStatus(HttpStatus.OK)
    public void updateTrainingProgramExercisePlan(@PathVariable Integer programId,
                                                  @RequestBody @Valid TrainingProgramExercisesRequest trainingProgramExercisesRequest, Authentication auth) {
        trainingProgramExerciseService.updateTrainingProgramExercises(programId, trainingProgramExercisesRequest);
    }

}
