package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.TraineeOnTrainingProgram;
import dev.gethealthy.app.models.entities.TraineeOnTrainingProgramId;
import dev.gethealthy.app.models.entities.TrainingProgram;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TraineeOnTrainingProgramRepository extends JpaRepository<TraineeOnTrainingProgram, TraineeOnTrainingProgramId> {
    List<TraineeOnTrainingProgram> findByUser_Id(Integer userId);

    Boolean existsByProgram_IdAndUser_Id(Integer programId, Integer traineeId);

    @Query("SELECT COUNT(e.id) from TraineeOnTrainingProgram e WHERE e.program.id = ?1")
    Integer calculateNumberOfTraineesOnTrainingProgram(Integer programId);

    @Query("SELECT e from TraineeOnTrainingProgram e WHERE e.program.id = :programId AND CONCAT(e.user.firstName , ' ', e.user.lastName) LIKE %:filter%")
    Page<TraineeOnTrainingProgram> getAllTraineesOnTrainingProgramFiltered(Integer programId, String filter, Pageable page);

    @Query("SELECT e.program from TraineeOnTrainingProgram e WHERE e.user.id = :traineeId and " +
            "(e.program.name like %:filter% or e.program.trainer.firstName like %:filter% or e.program.trainer.lastName like %:filter%)")
    Page<TrainingProgram> getAllTraineeProgramsFiltered(Integer traineeId, String filter, Pageable page);
}
