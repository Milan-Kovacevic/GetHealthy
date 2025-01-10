package dev.gethealthy.app.services;

import dev.gethealthy.app.base.CrudService;
import dev.gethealthy.app.models.entities.TrainingProgramApplicationId;
import dev.gethealthy.app.models.requests.TrainingProgramApplicationProcessRequest;
import dev.gethealthy.app.models.requests.TrainingProgramApplicationRequest;
import dev.gethealthy.app.models.responses.SingleProgramApplicationResponse;
import dev.gethealthy.app.models.responses.ProgramApplicationResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TrainingProgramApplicationService  {
    Page<ProgramApplicationResponse> getAllApplicationsForTrainer(Integer trainerId, Pageable page);
    Page<ProgramApplicationResponse> getAllApplicationsForTrainerFiltered(Integer userId, String filter, Pageable page);
    SingleProgramApplicationResponse getProgramApplication(Integer traineeId, Integer programId);
    ProgramApplicationResponse createTrainingProgramApplication(TrainingProgramApplicationRequest request);
    void processTrainingProgramApplication(Integer traineeId, Integer programId,
            TrainingProgramApplicationProcessRequest request);
    void markTrainingProgramApplicationAsRead(TrainingProgramApplicationId id);
}
