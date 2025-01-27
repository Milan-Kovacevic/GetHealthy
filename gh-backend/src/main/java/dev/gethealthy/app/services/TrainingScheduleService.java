package dev.gethealthy.app.services;

import dev.gethealthy.app.base.CrudService;
import dev.gethealthy.app.models.requests.TrainingScheduleRequest;
import dev.gethealthy.app.models.responses.TrainingScheduleResponse;

import java.util.List;

public interface TrainingScheduleService {

    List<TrainingScheduleResponse> getScheduleForTrainer(Integer userId);

    List<TrainingScheduleResponse> getScheduleForTrainee(Integer userId);

    TrainingScheduleResponse addProgramOnSchedule(TrainingScheduleRequest request);

    TrainingScheduleResponse updateTrainingScheduleProgram(Integer id, TrainingScheduleRequest request);

    void removeProgramFromSchedule(Integer id);
}
