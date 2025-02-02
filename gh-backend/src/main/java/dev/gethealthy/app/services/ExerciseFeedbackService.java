package dev.gethealthy.app.services;

import dev.gethealthy.app.models.requests.ExerciseFeedbackRequest;
import dev.gethealthy.app.models.responses.ExerciseFeedbackResponse;

public interface ExerciseFeedbackService {
    ExerciseFeedbackResponse addExerciseFeedback(Integer traineeExercisingId, ExerciseFeedbackRequest request);
    ExerciseFeedbackResponse skipExercise(Integer traineeExercisingId, ExerciseFeedbackRequest request);
}
