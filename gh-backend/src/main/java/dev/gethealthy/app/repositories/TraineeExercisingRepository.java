package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.TraineeExercising;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;
import java.util.Set;

public interface TraineeExercisingRepository extends JpaRepository<TraineeExercising, Integer> {

    List<TraineeExercising> findAllByProgramId(int programId);

    List<TraineeExercising> findAllByProgramIdAndTraineeId(int exerciseId, int traineeId);

    List<TraineeExercising> findAllByTraineeIdAndDateTakenBetweenOrderByDateTaken(Integer traineeId, @NotNull Instant dateTaken, @NotNull Instant dateTaken2);

    Set<TraineeExercising> findAllByTraineeId(int traineeId);

    List<TraineeExercising> findAllByProgramIdIn(@NotNull List<Integer> programIds);

    List<TraineeExercising> findByProgramIdAndTraineeIdOrderByDateTakenDesc(Integer id, int traineeId);

    List<TraineeExercising> findByProgramIdAndTraineeIdAndDateTakenAfterOrderByDateTakenAsc(Integer programId, Integer traineeId, Instant dateTaken);
}
