package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.TraineeExercising;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TraineeExercisingRepository extends JpaRepository<TraineeExercising, Integer> {

    List<TraineeExercising> findAllByProgramId(int programId);

    List<TraineeExercising> findAllByProgramIdAndUserId(int exerciseId, int traineeId);
}
