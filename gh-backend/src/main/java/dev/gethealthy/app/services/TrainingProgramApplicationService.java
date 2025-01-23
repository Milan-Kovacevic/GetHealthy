package dev.gethealthy.app.services;

import dev.gethealthy.app.models.entities.TrainingProgramApplicationId;
import dev.gethealthy.app.models.requests.ProcessRequest;
import dev.gethealthy.app.models.requests.TrainingProgramApplicationRequest;
import dev.gethealthy.app.models.responses.SingleProgramApplicationResponse;
import dev.gethealthy.app.models.responses.ProgramApplicationResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TrainingProgramApplicationService  {
    Page<ProgramApplicationResponse> getAllApplicationsForTrainer(Integer trainerId, Pageable page);
    Page<ProgramApplicationResponse> getAllApplicationsForTrainerFiltered(Integer userId, String filter, Pageable page);
    SingleProgramApplicationResponse getProgramApplication(Integer traineeId, Integer programId);
    ProgramApplicationResponse createTrainingProgramApplication(Integer traineeId, TrainingProgramApplicationRequest request);
    void processTrainingProgramApplication(Integer traineeId, Integer programId,
            ProcessRequest request);
    void markTrainingProgramApplicationAsRead(TrainingProgramApplicationId id);
}
