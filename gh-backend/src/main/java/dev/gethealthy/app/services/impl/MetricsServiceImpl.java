package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.models.entities.ExerciseMetric;
import dev.gethealthy.app.repositories.MetricsRepository;
import dev.gethealthy.app.services.MetricsService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class MetricsServiceImpl extends CrudJpaService<ExerciseMetric, Integer> implements MetricsService {
    public MetricsServiceImpl(MetricsRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, ExerciseMetric.class);
    }
}
