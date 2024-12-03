package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.models.entities.TrainingProgram;
import dev.gethealthy.app.services.TrainingProgramService;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class TrainingProgramServiceImpl extends CrudJpaService<TrainingProgram, Integer> implements TrainingProgramService {
    public TrainingProgramServiceImpl(JpaRepository<TrainingProgram, Integer> repository, ModelMapper modelMapper) {
        super(repository, modelMapper, TrainingProgram.class);
    }
}
