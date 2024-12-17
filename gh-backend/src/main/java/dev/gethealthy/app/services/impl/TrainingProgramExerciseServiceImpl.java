package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.models.entities.TrainingProgram;
import dev.gethealthy.app.models.entities.TrainingProgramExercise;
import dev.gethealthy.app.repositories.TrainingProgramExerciseRepository;
import dev.gethealthy.app.repositories.TrainingProgramRepository;
import dev.gethealthy.app.services.TrainingProgramExerciseService;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class TrainingProgramExerciseServiceImpl extends CrudJpaService<TrainingProgramExercise, Integer> implements TrainingProgramExerciseService {
    public TrainingProgramExerciseServiceImpl(TrainingProgramExerciseRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, TrainingProgramExercise.class);
    }
}
