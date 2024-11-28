package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.models.entities.Exercise;
import dev.gethealthy.app.services.ExerciseService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ExerciseServiceImpl extends CrudJpaService<Exercise, Integer> implements ExerciseService {
    public ExerciseServiceImpl(JpaRepository<Exercise, Integer> repository, ModelMapper modelMapper) {
        super(repository, modelMapper, Exercise.class);
    }
}
