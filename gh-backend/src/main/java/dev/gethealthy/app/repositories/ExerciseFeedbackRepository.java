package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.ExerciseFeedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseFeedbackRepository extends JpaRepository<ExerciseFeedback, Integer> {
}
