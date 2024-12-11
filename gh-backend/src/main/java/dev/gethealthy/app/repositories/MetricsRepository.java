package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.ExerciseMetric;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MetricsRepository extends JpaRepository<ExerciseMetric, Integer> {
}
