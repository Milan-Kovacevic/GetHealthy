package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.exceptions.NotFoundException;
import dev.gethealthy.app.models.entities.ExerciseFeedback;
import dev.gethealthy.app.models.entities.ExerciseSetFeedback;
import dev.gethealthy.app.models.requests.ExerciseFeedbackRequest;
import dev.gethealthy.app.models.requests.ExerciseSetFeedbackRequest;
import dev.gethealthy.app.models.requests.SkipExerciseSetFeedbackRequest;
import dev.gethealthy.app.models.responses.ExerciseFeedbackResponse;
import dev.gethealthy.app.models.responses.ExerciseSetFeedbackResponse;
import dev.gethealthy.app.repositories.ExerciseFeedbackRepository;
import dev.gethealthy.app.repositories.ExerciseSetFeedbackRepository;
import dev.gethealthy.app.repositories.TraineeExercisingRepository;
import dev.gethealthy.app.repositories.TrainingProgramExerciseRepository;
import dev.gethealthy.app.services.ExerciseSetFeedbackService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@Transactional
@RequiredArgsConstructor
public class ExerciseSetFeedbackServiceImpl implements ExerciseSetFeedbackService {
    @PersistenceContext
    private EntityManager entityManager;
    private final ExerciseFeedbackRepository exerciseFeedbackRepository;
    private final ExerciseSetFeedbackRepository exerciseSetFeedbackRepository;
    private final ModelMapper modelMapper;

    @Override
    public ExerciseSetFeedbackResponse addExerciseSetFeedback(Integer traineeExercisingId, Integer exerciseFeedbackId, ExerciseSetFeedbackRequest request) {
        var exerciseFeedback = exerciseFeedbackRepository
                .findById(exerciseFeedbackId)
                .orElseThrow(NotFoundException::new);

        if (!Objects.equals(exerciseFeedback.getTraineeExercising().getId(), traineeExercisingId))
            throw new NotFoundException();

        var entity = new ExerciseSetFeedback();
        entity.setExerciseFeedback(exerciseFeedback);
        entity.setCompleted(request.getCompleted());
        entity.setSkipped(false);
        entity.setFirstMetricValueFeedback(request.getFirstMetricValueFeedback());
        entity.setSecondMetricValueFeedback(request.getSecondMetricValueFeedback());

        entity.setId(null);
        entity = exerciseSetFeedbackRepository.saveAndFlush(entity);
        entityManager.refresh(entity);

        var response = new ExerciseSetFeedbackResponse();
        response.setSetFeedbackId(entity.getId());
        return response;
    }

    @Override
    public ExerciseSetFeedbackResponse skipExerciseSet(Integer traineeExercisingId, Integer exerciseFeedbackId, SkipExerciseSetFeedbackRequest request) {
        var exerciseFeedback = exerciseFeedbackRepository
                .findById(exerciseFeedbackId)
                .orElseThrow(NotFoundException::new);

        var entity = getExerciseSetFeedback(traineeExercisingId, exerciseFeedback);
        entity = exerciseSetFeedbackRepository.saveAndFlush(entity);
        entityManager.refresh(entity);

        var response = new ExerciseSetFeedbackResponse();
        response.setSetFeedbackId(entity.getId());
        return response;
    }

    private static ExerciseSetFeedback getExerciseSetFeedback(Integer traineeExercisingId, ExerciseFeedback exerciseFeedback) {
        if (!Objects.equals(exerciseFeedback.getTraineeExercising().getId(), traineeExercisingId))
            throw new NotFoundException();

        var exercise = exerciseFeedback.getExercise();

        var entity = new ExerciseSetFeedback();
        entity.setExerciseFeedback(exerciseFeedback);
        entity.setCompleted(false);
        entity.setSkipped(true);
        entity.setFirstMetricValueFeedback("");
        if(exercise.getSecondExerciseMetric() != null){
            entity.setSecondMetricValueFeedback("");
        }

        entity.setId(null);
        return entity;
    }
}
