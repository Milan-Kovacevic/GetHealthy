package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.models.entities.TrainingProgramOnSchedule;
import dev.gethealthy.app.services.TrainingScheduleService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class TrainingScheduleServiceImpl extends CrudJpaService<TrainingProgramOnSchedule, Integer> implements TrainingScheduleService {

    public TrainingScheduleServiceImpl(JpaRepository<TrainingProgramOnSchedule, Integer> repository, ModelMapper modelMapper) {
        super(repository, modelMapper, TrainingProgramOnSchedule.class);
    }
}
