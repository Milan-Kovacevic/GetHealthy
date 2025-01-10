package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.TrainingProgramApplication;
import dev.gethealthy.app.models.entities.TrainingProgramApplicationId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TrainingProgramApplicationRepository extends JpaRepository<TrainingProgramApplication, TrainingProgramApplicationId> {
    Page<TrainingProgramApplication> findByProgram_Trainer_IdOrderByMarkReadAsc(Integer trainerId, Pageable page);
    Boolean existsByProgram_IdAndTrainee_Id(Integer programId, Integer traineeId);
    void deleteByProgram_IdAndTrainee_Id(Integer programId, Integer traineeId);
    Optional<TrainingProgramApplication> findByProgram_IdAndTrainee_Id(Integer programId, Integer traineeId);
    @Query("SELECT e from TrainingProgramApplication e WHERE e.program.trainer.id=:userId " +
            "and (e.program.name like %:filter% or e.trainee.firstName like %:filter% or e.trainee.lastName like %:filter%) order by e.markRead asc")
    Page<TrainingProgramApplication> findAllTrainerApplicationsFiltered(Integer userId, String filter, Pageable page);
}
