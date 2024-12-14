package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.TrainingProgramApplication;
import dev.gethealthy.app.models.entities.TrainingProgramApplicationId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TrainingProgramApplicationRepository extends JpaRepository<TrainingProgramApplication, TrainingProgramApplicationId> {
    Page<TrainingProgramApplication> findByProgram_Trainer_IdOrderByMarkReadAsc(Integer trainerId, Pageable page);

    List<TrainingProgramApplication> findByProgram_IdOrderByMarkReadAsc(Integer programId);

    Boolean existsByProgram_IdAndUser_Id(Integer programId, Integer userId);

    @Query("SELECT e from TrainingProgramApplication e WHERE e.program.trainer.id=:userId " +
            "and (e.program.name like %:filter% or e.user.firstName like %:filter% or e.user.lastName like %:filter%) order by e.markRead asc")
    Page<TrainingProgramApplication> findAllTrainerApplicationsFiltered(Integer userId, String filter, Pageable page);

    @Query("SELECT COUNT(e.id) from TrainingProgramApplication e WHERE e.program.id = ?1")
    Integer calculateNumberOfTrainingProgramApplications(Integer programId);

    @Query("SELECT COUNT(e.id) from TrainingProgramApplication e WHERE e.program.trainer.id = ?1 and e.markRead=false")
    Long calculateTotalNumberOfUnreadProgramApplicationsForTrainer(Integer trainerId);
}
