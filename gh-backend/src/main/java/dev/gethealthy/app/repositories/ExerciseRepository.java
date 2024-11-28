package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseRepository extends JpaRepository<Exercise, Integer> {
}
