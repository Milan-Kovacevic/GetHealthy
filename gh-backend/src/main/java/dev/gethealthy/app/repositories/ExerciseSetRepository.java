package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.ExerciseSet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseSetRepository extends JpaRepository<ExerciseSet, Integer> {
}
