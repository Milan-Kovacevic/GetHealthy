package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.TraineeExercising;
import dev.gethealthy.app.models.enums.DayOfWeek;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface TraineeExercisingRepository extends JpaRepository<TraineeExercising, Integer> {

    List<TraineeExercising> findAllByProgramId(int programId);

    List<TraineeExercising> findAllByProgramIdAndTraineeId(int exerciseId, int traineeId);

    List<TraineeExercising> findAllByTraineeIdAndDateTakenBetweenOrderByDateTaken(Integer traineeId, @NotNull Instant dateTaken, @NotNull Instant dateTaken2);

    Set<TraineeExercising> findAllByTraineeId(int traineeId);

    List<TraineeExercising> findAllByProgramIdIn(@NotNull List<Integer> programIds);

    List<TraineeExercising> findByProgramIdAndTraineeIdOrderByDateTakenDesc(Integer id, int traineeId);

    List<TraineeExercising> findByProgramIdAndTraineeIdAndDateTakenAfterOrderByDateTakenAsc(Integer programId, Integer traineeId, Instant dateTaken);


    @Query("SELECT te FROM TraineeExercising te " +
            "JOIN te.programSchedule pos " +
            "WHERE pos.id = :scheduleProgramId ORDER BY te.dateTaken DESC"
            )
    List<TraineeExercising> findByScheduleProgramIdSortedByDateTakenDesc(
            @Param("scheduleProgramId") Integer scheduleProgramId
    );
}
