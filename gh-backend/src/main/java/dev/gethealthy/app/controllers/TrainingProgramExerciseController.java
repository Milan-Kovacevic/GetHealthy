package dev.gethealthy.app.controllers;

import dev.gethealthy.app.base.CrudController;
import dev.gethealthy.app.base.CrudService;
import dev.gethealthy.app.models.entities.ExerciseSet;
import dev.gethealthy.app.models.entities.TrainingProgramExercise;
import dev.gethealthy.app.models.requests.TrainingProgramExerciseRequest;
import dev.gethealthy.app.models.requests.TrainingProgramRequest;
import dev.gethealthy.app.models.responses.ProgramExerciseResponse;
import dev.gethealthy.app.models.responses.TrainingProgramResponse;
import dev.gethealthy.app.services.ExerciseSetService;
import dev.gethealthy.app.services.TrainingProgramExerciseService;
import dev.gethealthy.app.services.ExerciseSetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${gethealthy.base-url}/training-programs")
public class TrainingProgramExerciseController  {
    private final TrainingProgramExerciseService trainingProgramExerciseService;
    private final ExerciseSetService exerciseSetService;

    @GetMapping("{programId}/exercises")
    public List<ProgramExerciseResponse> getTrainingProgramExercises(@PathVariable(name = "programId") Integer programId) {
        return trainingProgramExerciseService.getTrainingProgramExercises(programId);
    }

    // TODO: Fix implementation ...
    @PostMapping("{programId}/exercises")
    public void addExercisesToTrainingProgram(@PathVariable(name = "programId") Integer programId,
                                              @RequestBody List<TrainingProgramExerciseRequest> requests)
    {
//        for (var request : requests)
//        {
//            var programExercise = trainingProgramExerciseService.insert(request, TrainingProgramExercise.class);
//
//            for (var set : request.getExerciseSets()) {
//                set.setProgramExericseId(programExercise.getId());
//                exerciseSetService.insert(set, ExerciseSet.class);
//            }
//        }
    }
}
