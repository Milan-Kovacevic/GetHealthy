package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.Exercise;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ExerciseRepository extends JpaRepository<Exercise, Integer> {

    @Query("SELECT e from Exercise e WHERE e.name like %:searchQuery%")
    Page<Exercise> getAllExercisesFiltered(String searchQuery, Pageable pageable);
}
