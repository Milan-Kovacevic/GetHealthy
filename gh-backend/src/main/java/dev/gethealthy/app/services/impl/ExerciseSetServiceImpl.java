package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.models.entities.ExerciseSet;
import dev.gethealthy.app.services.ExerciseSetService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ExerciseSetServiceImpl extends CrudJpaService<ExerciseSet, Integer> implements ExerciseSetService {
    public ExerciseSetServiceImpl(JpaRepository<ExerciseSet, Integer> repository, ModelMapper modelMapper) {
        super(repository, modelMapper, ExerciseSet.class);
    }
}
