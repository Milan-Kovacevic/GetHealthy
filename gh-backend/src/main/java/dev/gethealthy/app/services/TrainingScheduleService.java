package dev.gethealthy.app.services;

import dev.gethealthy.app.base.CrudService;
import dev.gethealthy.app.models.responses.TrainingScheduleResponse;

import java.util.List;

public interface TrainingScheduleService extends CrudService<Integer> {

    List<TrainingScheduleResponse> getScheduleForTrainer(Integer userId);

    List<TrainingScheduleResponse> getScheduleForTrainee(Integer userId);
}
