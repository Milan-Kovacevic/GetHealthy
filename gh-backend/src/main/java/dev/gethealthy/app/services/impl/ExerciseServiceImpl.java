package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.models.entities.Exercise;
import dev.gethealthy.app.models.responses.ExerciseListingResponse;
import dev.gethealthy.app.models.responses.ExerciseResponse;
import dev.gethealthy.app.repositories.ExerciseRepository;
import dev.gethealthy.app.services.ExerciseService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@Transactional
public class ExerciseServiceImpl extends CrudJpaService<Exercise, Integer> implements ExerciseService {
    private final ExerciseRepository exerciseRepository;
    public ExerciseServiceImpl(ExerciseRepository exerciseRepository, ModelMapper modelMapper) {
        super(exerciseRepository, modelMapper, Exercise.class);
        this.exerciseRepository = exerciseRepository;
    }

    @Override
    public Page<ExerciseResponse> getAllExercisesFiltered(Pageable page, String searchQuery) {
        return exerciseRepository
                .getAllExercisesFiltered(searchQuery, page)
                .map(e -> modelMapper.map(e, ExerciseResponse.class));
    }

    @Override
    public Page<ExerciseListingResponse> getExercisesListed(Pageable page) {
        return exerciseRepository
                .getAllExercisesFiltered("", page)
                .map(e -> modelMapper.map(e, ExerciseListingResponse.class));
    }
}
