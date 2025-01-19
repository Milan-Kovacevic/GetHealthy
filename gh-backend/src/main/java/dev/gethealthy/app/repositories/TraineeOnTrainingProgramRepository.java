package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.TraineeExercising;
import dev.gethealthy.app.models.entities.TraineeOnTrainingProgram;
import dev.gethealthy.app.models.entities.TraineeOnTrainingProgramId;
import dev.gethealthy.app.models.entities.TrainingProgram;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TraineeOnTrainingProgramRepository extends JpaRepository<TraineeOnTrainingProgram, TraineeOnTrainingProgramId> {
    List<TraineeOnTrainingProgram> findAllByProgram_Id(Integer programId);
    Boolean existsByProgram_IdAndUser_Id(Integer programId, Integer traineeId);
    void deleteByProgram_IdAndUser_Id(Integer programId, Integer traineeId);
    Optional<TraineeOnTrainingProgram> findByProgram_IdAndUser_Id(Integer programId, Integer userId);
    @Query("SELECT e from TraineeOnTrainingProgram e WHERE e.program.id = :programId AND CONCAT(e.user.firstName , ' ', e.user.lastName) LIKE %:filter%")
    Page<TraineeOnTrainingProgram> getAllTraineesOnTrainingProgramFiltered(Integer programId, String filter, Pageable page);

    List<TraineeOnTrainingProgram> findAllByUserId(Integer userId);
}
