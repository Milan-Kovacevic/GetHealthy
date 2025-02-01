package dev.gethealthy.app.services;

import dev.gethealthy.app.base.CrudService;
import dev.gethealthy.app.models.requests.ExerciseFeedbackRequest;
import dev.gethealthy.app.models.responses.ExerciseFeedbackResponse;

public interface ExerciseFeedbackService extends CrudService<Integer> {
    public ExerciseFeedbackResponse addExerciseFeedback(ExerciseFeedbackRequest request);
}
