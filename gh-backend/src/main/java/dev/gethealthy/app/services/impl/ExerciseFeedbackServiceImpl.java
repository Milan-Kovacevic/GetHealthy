package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.models.entities.ExerciseFeedback;
import dev.gethealthy.app.models.requests.ExerciseFeedbackRequest;
import dev.gethealthy.app.models.responses.ExerciseFeedbackResponse;
import dev.gethealthy.app.repositories.ExerciseFeedbackRepository;
import dev.gethealthy.app.services.ExerciseFeedbackService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ExerciseFeedbackServiceImpl extends CrudJpaService<ExerciseFeedback, Integer> implements ExerciseFeedbackService {
    @PersistenceContext
    private EntityManager entityManager;
    private final ExerciseFeedbackRepository exerciseFeedbackRepository;

    public ExerciseFeedbackServiceImpl(ExerciseFeedbackRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, ExerciseFeedback.class);
        this.exerciseFeedbackRepository = repository;
    }

    @Override
    public ExerciseFeedbackResponse addExerciseFeedback(ExerciseFeedbackRequest request) {
        var entity = modelMapper.map(request, ExerciseFeedback.class);
        entity.setId(null);
        entity = exerciseFeedbackRepository.saveAndFlush(entity);
        entityManager.refresh(entity);

        var response = new ExerciseFeedbackResponse();
        response.setExerciseFeedbackId(entity.getId());
        return response;
    }
}
