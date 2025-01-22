package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.models.entities.ExerciseMetric;
import dev.gethealthy.app.models.responses.MetricsResponse;
import dev.gethealthy.app.repositories.MetricsRepository;
import dev.gethealthy.app.services.MetricsService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class MetricsServiceImpl extends CrudJpaService<ExerciseMetric, Integer> implements MetricsService {
    private final MetricsRepository metricsRepository;

    public MetricsServiceImpl(MetricsRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, ExerciseMetric.class);
        this.metricsRepository = repository;
    }

    @Override
    public Page<MetricsResponse> getPageableExerciseMetrics(Pageable page) {
        return metricsRepository.findAll(page).map(e -> modelMapper.map(e, MetricsResponse.class));
    }
}
