package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.models.entities.ExerciseFeedback;
import dev.gethealthy.app.models.entities.ExerciseSetFeedback;
import dev.gethealthy.app.models.entities.TraineeExercising;
import dev.gethealthy.app.models.requests.StartWorkoutRequest;
import dev.gethealthy.app.models.responses.StartWorkoutResponse;
import dev.gethealthy.app.repositories.ExerciseFeedbackRepository;
import dev.gethealthy.app.repositories.ExerciseSetFeedbackRepository;
import dev.gethealthy.app.repositories.TraineeExercisingRepository;
import dev.gethealthy.app.services.TraineeExercisingService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class TraineeExercisingServiceImpl extends CrudJpaService<TraineeExercising, Integer> implements TraineeExercisingService {

    public TraineeExercisingServiceImpl(TraineeExercisingRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, TraineeExercising.class);
    }
}
