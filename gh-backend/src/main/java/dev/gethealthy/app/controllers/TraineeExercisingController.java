package dev.gethealthy.app.controllers;

import dev.gethealthy.app.models.entities.TraineeExercising;
import dev.gethealthy.app.models.entities.TrainingProgramExercise;
import dev.gethealthy.app.models.requests.*;
import dev.gethealthy.app.models.responses.ExerciseFeedbackResponse;
import dev.gethealthy.app.models.responses.ExerciseSetFeedbackResponse;
import dev.gethealthy.app.models.responses.StartWorkoutResponse;
import dev.gethealthy.app.models.responses.WorkoutSummaryResponse;
import dev.gethealthy.app.services.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("${gethealthy.base-url}/workouts")
public class TraineeExercisingController {
    private final ExerciseFeedbackService exerciseFeedbackService;
    private final TraineeExercisingService traineeExercisingService;
    private final ExerciseSetFeedbackService exerciseSetFeedbackService;

    @PostMapping("start")
    public StartWorkoutResponse start(@RequestBody StartWorkoutRequest request)
    {
        return traineeExercisingService.start(request);
    }

    @PostMapping("summary")
    public WorkoutSummaryResponse generateWorkoutSummary(@RequestBody WorkoutSummaryRequest request)
    {
        return traineeExercisingService.getWorkoutSummary(request);
    }

    @PostMapping("{traineeExercisingId}/exercises/skip")
    public ExerciseFeedbackResponse skipExercise(@PathVariable int traineeExercisingId, @RequestBody ExerciseFeedbackRequest request)
    {
        return exerciseFeedbackService.skipExercise(traineeExercisingId, request);
    }

    @PostMapping("{traineeExercisingId}/exercises/begin")
    public ExerciseFeedbackResponse beginExercise(@PathVariable int traineeExercisingId, @RequestBody ExerciseFeedbackRequest request)
    {
        return exerciseFeedbackService.addExerciseFeedback(traineeExercisingId, request);
    }

    @PostMapping("{traineeExercisingId}/exercises/{exerciseFeedbackId}/sets/skip")
    public ExerciseSetFeedbackResponse skipExerciseSet(@PathVariable int traineeExercisingId,
                                                       @PathVariable int exerciseFeedbackId,
                                                       @RequestBody SkipExerciseSetFeedbackRequest request)
    {
        return exerciseSetFeedbackService.skipExerciseSet(traineeExercisingId, exerciseFeedbackId, request);
    }

    @PostMapping("{traineeExercisingId}/exercises/{exerciseFeedbackId}/sets")
    public ExerciseSetFeedbackResponse giveFeedback(@PathVariable int traineeExercisingId,
                                                       @PathVariable int exerciseFeedbackId,
                                                       @RequestBody ExerciseSetFeedbackRequest request)
    {
        return exerciseSetFeedbackService.addExerciseSetFeedback(traineeExercisingId, exerciseFeedbackId, request);
    }
}
