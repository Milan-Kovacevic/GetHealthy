package dev.gethealthy.app.controllers;

import dev.gethealthy.app.base.CrudController;
import dev.gethealthy.app.base.CrudService;
import dev.gethealthy.app.models.entities.ExerciseSet;
import dev.gethealthy.app.models.entities.TrainingProgramExercise;
import dev.gethealthy.app.models.requests.TrainingProgramExerciseRequest;
import dev.gethealthy.app.models.requests.TrainingProgramRequest;
import dev.gethealthy.app.models.responses.TrainingProgramResponse;
import dev.gethealthy.app.services.TrainingProgramExerciseService;
import dev.gethealthy.app.services.ExerciseSetService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${gethealthy.base-url}/training-program-exercises")
public class TrainingProgramExerciseController  {
    TrainingProgramExerciseService crudService;
    ExerciseSetService exerciseSetService;

    public TrainingProgramExerciseController(TrainingProgramExerciseService crudService, ExerciseSetService exerciseSetService) {
        this.crudService = crudService;
        this.exerciseSetService = exerciseSetService;
    }

    @PostMapping
    public void addExercisesToTrainingProgram(@RequestBody List<TrainingProgramExerciseRequest> requests)
    {
        for (var request : requests)
        {
            var programExercise = crudService.insert(request, TrainingProgramExercise.class);
            for (var set : request.getExerciseSets())
            {
                ExerciseSet exerciseSet = new ExerciseSet();
                exerciseSet.setProgramExericse(programExercise);
                exerciseSet.setRestTime(set.getRestTime());
                exerciseSet.setFirstMetricValue(set.getFirstMetricValue());
                exerciseSet.setSecondMetricValue(set.getSecondMetricValue());
                exerciseSetService.insert(exerciseSet, ExerciseSet.class);
            }
        }
    }
}
