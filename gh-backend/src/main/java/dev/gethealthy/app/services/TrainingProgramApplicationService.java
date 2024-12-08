package dev.gethealthy.app.services;

import dev.gethealthy.app.base.CrudService;
import dev.gethealthy.app.models.entities.TrainingProgramApplication;
import dev.gethealthy.app.models.entities.TrainingProgramApplicationId;
import dev.gethealthy.app.models.requests.TrainingProgramApplicationProcessRequest;
import dev.gethealthy.app.models.requests.TrainingProgramApplicationRequest;
import dev.gethealthy.app.models.responses.SingleTrainingProgramApplicationResponse;
import dev.gethealthy.app.models.responses.TrainingProgramApplicationResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TrainingProgramApplicationService extends CrudService<TrainingProgramApplicationId> {
    List<TrainingProgramApplicationResponse> getAllApplicationsForTrainingProgram(Integer programId);

    Page<TrainingProgramApplicationResponse> getAllApplicationsForTrainer(Integer trainerId, Pageable page);

    Page<TrainingProgramApplicationResponse> getAllApplicationsForTrainerFiltered(Integer userId, String filter, Pageable page);

    SingleTrainingProgramApplicationResponse getProgramApplication(TrainingProgramApplicationId id);

    TrainingProgramApplicationResponse insertTrainingProgramApplication(TrainingProgramApplicationRequest request);

    void processTrainingProgramApplication(TrainingProgramApplicationId id, TrainingProgramApplicationProcessRequest request);

    void markTrainingProgramApplicationAsRead(TrainingProgramApplicationId id);
}
