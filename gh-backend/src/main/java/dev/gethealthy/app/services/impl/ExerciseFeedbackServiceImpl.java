package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.exceptions.BadRequestException;
import dev.gethealthy.app.exceptions.NotFoundException;
import dev.gethealthy.app.models.entities.ExerciseFeedback;
import dev.gethealthy.app.models.entities.TrainingProgramExercise;
import dev.gethealthy.app.models.requests.ExerciseFeedbackRequest;
import dev.gethealthy.app.models.responses.ExerciseFeedbackResponse;
import dev.gethealthy.app.repositories.ExerciseFeedbackRepository;
import dev.gethealthy.app.repositories.TraineeExercisingRepository;
import dev.gethealthy.app.repositories.TrainingProgramExerciseRepository;
import dev.gethealthy.app.services.ExerciseFeedbackService;
import dev.gethealthy.app.services.TrainingProgramExerciseService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class ExerciseFeedbackServiceImpl implements ExerciseFeedbackService {
    @PersistenceContext
    private EntityManager entityManager;
    private final ExerciseFeedbackRepository exerciseFeedbackRepository;
    private final TrainingProgramExerciseRepository trainingProgramExerciseRepository;
    private final TraineeExercisingRepository traineeExercisingRepository;
    private final ModelMapper modelMapper;

    @Override
    public ExerciseFeedbackResponse addExerciseFeedback(Integer traineeExercisingId, ExerciseFeedbackRequest request) {
        return saveExerciseFeedback(traineeExercisingId, request.getProgramExerciseId(), false);
    }

    @Override
    public ExerciseFeedbackResponse skipExercise(Integer traineeExercisingId, ExerciseFeedbackRequest request) {
        return saveExerciseFeedback(traineeExercisingId, request.getProgramExerciseId(), true);
    }

    private ExerciseFeedbackResponse saveExerciseFeedback(Integer traineeExercisingId, Integer programExerciseId, boolean skipExercise){
        if(exerciseFeedbackRepository.existsByTraineeExercising_IdAndProgramExercise_Id(traineeExercisingId, programExerciseId))
            throw new BadRequestException();

        var programExercise = trainingProgramExerciseRepository
                .findById(programExerciseId)
                .orElseThrow(NotFoundException::new);
        var traineeExercising = traineeExercisingRepository
                .findById(traineeExercisingId)
                .orElseThrow(NotFoundException::new);

        var entity = new ExerciseFeedback();
        entity.setExercise(programExercise.getExercise());
        entity.setProgramExercise(programExercise);
        entity.setSkipped(skipExercise);
        entity.setTraineeExercising(traineeExercising);
        entity.setId(null);
        entity = exerciseFeedbackRepository.saveAndFlush(entity);
        entityManager.refresh(entity);

        var response = new ExerciseFeedbackResponse();
        response.setExerciseFeedbackId(entity.getId());
        return response;
    }
}
