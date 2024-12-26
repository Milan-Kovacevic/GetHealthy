package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.ExerciseSetFeedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseSetFeedbackRepository extends JpaRepository<ExerciseSetFeedback, Integer> {
}
