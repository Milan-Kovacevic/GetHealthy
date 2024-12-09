package dev.gethealthy.app.services;

import dev.gethealthy.app.models.requests.TraineeRequest;
import dev.gethealthy.app.models.requests.TrainerRequest;
import dev.gethealthy.app.models.responses.TraineeResponse;
import dev.gethealthy.app.models.responses.TrainerResponse;

public interface UserService {
    TrainerResponse getTrainer(Integer trainerId);

    TraineeResponse getTrainee(Integer traineeId);

    void updateTrainer(TrainerRequest request);

    void updateTrainee(TraineeRequest request);
}
