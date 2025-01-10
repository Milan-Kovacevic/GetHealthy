package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.ExerciseFeedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExerciseFeedbackRepository extends JpaRepository<ExerciseFeedback, Integer> {
}
