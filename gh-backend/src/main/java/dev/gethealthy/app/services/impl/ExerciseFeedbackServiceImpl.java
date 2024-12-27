package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.models.entities.ExerciseFeedback;
import dev.gethealthy.app.repositories.ExerciseFeedbackRepository;
import dev.gethealthy.app.services.ExerciseFeedbackService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ExerciseFeedbackServiceImpl extends CrudJpaService<ExerciseFeedback, Integer> implements ExerciseFeedbackService {
    public ExerciseFeedbackServiceImpl(ExerciseFeedbackRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, ExerciseFeedback.class);
    }
}
