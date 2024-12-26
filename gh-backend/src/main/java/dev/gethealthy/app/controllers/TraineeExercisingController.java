package dev.gethealthy.app.controllers;

import dev.gethealthy.app.models.requests.ExerciseFeedbackRequest;
import dev.gethealthy.app.models.requests.ExerciseSetFeedbackRequest;
import dev.gethealthy.app.models.requests.StartWorkoutRequest;
import dev.gethealthy.app.models.responses.ExerciseFeedbackResponse;
import dev.gethealthy.app.models.responses.StartWorkoutResponse;
import dev.gethealthy.app.services.ExerciseFeedbackService;
import dev.gethealthy.app.services.ExerciseSetFeedbackService;
import dev.gethealthy.app.services.TraineeExercisingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("${gethealthy.base-url}/trainee-exercising")
public class TraineeExercisingController {
    private final ExerciseFeedbackService exerciseFeedbackService;
    private final TraineeExercisingService traineeExercisingService;
    private final ExerciseSetFeedbackService exerciseSetFeedbackService;

    @PostMapping("start")
    public StartWorkoutResponse start(StartWorkoutRequest request)
    {
        return traineeExercisingService.insert(request, StartWorkoutResponse.class);
    }

    @PostMapping("exercise-feedback")
    public ExerciseFeedbackResponse exerciseFeedback(ExerciseFeedbackRequest request)
    {
        return exerciseFeedbackService.insert(request, ExerciseFeedbackResponse.class);
    }

    @PostMapping("exercise-set-feedback")
    public Void exerciseSetFeedback(ExerciseSetFeedbackRequest request)
    {
       return exerciseSetFeedbackService.insert(request, Void.class);
    }
}
