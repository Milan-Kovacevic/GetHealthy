package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.models.entities.ExerciseSetFeedback;
import dev.gethealthy.app.repositories.ExerciseSetFeedbackRepository;
import dev.gethealthy.app.services.ExerciseSetFeedbackService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ExerciseSetFeedbackServiceImpl extends CrudJpaService<ExerciseSetFeedback, Integer> implements ExerciseSetFeedbackService {
    public ExerciseSetFeedbackServiceImpl(ExerciseSetFeedbackRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, ExerciseSetFeedback.class);
    }
}
