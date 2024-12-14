package dev.gethealthy.app.services;

import dev.gethealthy.app.base.CrudService;
import dev.gethealthy.app.models.entities.TrainingProgram;
import dev.gethealthy.app.models.responses.SingleTrainingProgramResponse;
import dev.gethealthy.app.models.responses.TrainerResponse;
import dev.gethealthy.app.models.responses.SingleProgramDetailsResponse;
import dev.gethealthy.app.models.responses.SingleProgramParticipantResponse;
import dev.gethealthy.app.models.responses.TrainingProgramResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

public interface TrainingProgramService extends CrudService<Integer> {
    Page<TrainingProgramResponse> findAll(Specification<TrainingProgram> spec, Sort sort, Pageable page);

    @Override
    void delete(Integer id);
    SingleTrainingProgramResponse getSingleTrainingProgram(Integer programId);
    TrainerResponse getTrainerByProgramId(Integer programId);


    SingleProgramDetailsResponse getTrainingProgramDetails(Integer id);

    Page<SingleProgramParticipantResponse> getTrainingProgramParticipants(Integer programId, String filter, Pageable page);
}
