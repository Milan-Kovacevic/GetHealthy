package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.TraineeExercising;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.Collection;
import java.util.List;
import java.util.Set;

public interface TraineeExercisingRepository extends JpaRepository<TraineeExercising, Integer> {

    List<TraineeExercising> findAllByProgramId(int programId);

    List<TraineeExercising> findAllByProgramIdAndUserId(int exerciseId, int traineeId);

    List<TraineeExercising> findAllByUserIdAndDateTakenBetween(Integer userId, @NotNull Instant dateTakenAfter, @NotNull Instant dateTakenBefore);

    List<TraineeExercising> findAllByUserIdAndDateTakenBetweenOrderByDateTaken(Integer user_id, @NotNull Instant dateTaken, @NotNull Instant dateTaken2);

    Set<TraineeExercising> findAllByUserId(int userId);
}
