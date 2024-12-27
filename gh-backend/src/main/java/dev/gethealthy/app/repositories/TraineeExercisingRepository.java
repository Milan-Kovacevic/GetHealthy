package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.TraineeExercising;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TraineeExercisingRepository extends JpaRepository<TraineeExercising, Integer> {
}
