package dev.gethealthy.app.controllers;

import dev.gethealthy.app.models.requests.TrainingProgramExercisesRequest;
import dev.gethealthy.app.models.responses.ProgramExerciseResponse;
import dev.gethealthy.app.services.TrainingProgramExerciseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
                                                  @RequestBody @Valid TrainingProgramExercisesRequest trainingProgramExercisesRequest) {
        trainingProgramExerciseService.updateTrainingProgramExercises(programId, trainingProgramExercisesRequest);
    }

}
