package dev.gethealthy.app.services;

import dev.gethealthy.app.base.CrudService;
import dev.gethealthy.app.models.requests.WorkoutSummaryRequest;
import dev.gethealthy.app.models.responses.WorkoutSummaryResponse;

public interface TraineeExercisingService extends CrudService<Integer> {

    WorkoutSummaryResponse getWorkoutSummary(WorkoutSummaryRequest request);
}
