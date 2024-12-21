package dev.gethealthy.app.services;

import dev.gethealthy.app.base.CrudService;
import dev.gethealthy.app.models.responses.ExerciseResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ExerciseService extends CrudService<Integer> {
    Page<ExerciseResponse> getAllExercisesFiltered(Pageable page, String searchQuery);
}
