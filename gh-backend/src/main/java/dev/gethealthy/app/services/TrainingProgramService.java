package dev.gethealthy.app.services;

import dev.gethealthy.app.base.CrudService;
import dev.gethealthy.app.models.entities.TrainingProgram;
import dev.gethealthy.app.models.requests.TrainingProgramExercisesRequest;
import dev.gethealthy.app.models.requests.TrainingProgramRequest;
import dev.gethealthy.app.models.responses.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface TrainingProgramService extends CrudService<Integer> {
    Page<TrainingProgramResponse> getFilteredTrainingPrograms(Specification<TrainingProgram> spec, Sort sort, Pageable page);

    Page<TrainerProgramResponse> getTrainingProgramsForTrainer(Integer userId, Pageable page);

    SingleTrainingProgramResponse getSingleTrainingProgram(Integer programId);

    TrainerResponse getTrainerByProgramId(Integer programId);

    SingleProgramDetailsResponse getTrainingProgramDetails(Integer id);

    @Override
    void delete(Integer id);

    List<FeaturedProgramResponse> getFeaturedTrainingPrograms();

    void createTrainingProgram(Integer userId, TrainingProgramRequest trainingProgramRequest,
                               TrainingProgramExercisesRequest trainingProgramExercisesRequest, MultipartFile file);

    void updateTrainingProgramGeneralInfo(Integer programId, TrainingProgramRequest trainingProgramRequest,
                                          MultipartFile file);
}
