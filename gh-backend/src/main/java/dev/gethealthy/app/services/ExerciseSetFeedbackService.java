package dev.gethealthy.app.services;

import dev.gethealthy.app.models.requests.ExerciseSetFeedbackRequest;
import dev.gethealthy.app.models.requests.SkipExerciseSetFeedbackRequest;
import dev.gethealthy.app.models.responses.ExerciseSetFeedbackResponse;

public interface ExerciseSetFeedbackService {
    ExerciseSetFeedbackResponse addExerciseSetFeedback(Integer traineeExercisingId, Integer exerciseFeedbackId, ExerciseSetFeedbackRequest request);
    ExerciseSetFeedbackResponse skipExerciseSet(Integer traineeExercisingId, Integer exerciseFeedbackId, SkipExerciseSetFeedbackRequest request);
}
