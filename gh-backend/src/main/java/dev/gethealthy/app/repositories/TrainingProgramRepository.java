package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.TrainingProgram;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TrainingProgramRepository extends JpaRepository<TrainingProgram, Integer>, JpaSpecificationExecutor<TrainingProgram>{
    @Query("SELECT COUNT(e.id) from TraineeOnTrainingProgram e WHERE e.program.id = ?1")
    Integer calculateNumberOfTrainingProgramTrainees(Integer programId);

    @Query("SELECT COUNT(e.id) from ProgramRating e WHERE e.program.id = ?1")
    Integer calculateNumberOfTrainingProgramRatings(Integer programId);

    @Query("SELECT ROUND(AVG(e.rate), 1) FROM ProgramRating e WHERE e.program.id = ?1")
    Optional<Double> calculateTrainingProgramAverageRate(Integer programId);

    Page<TrainingProgram> findAllByTrainer_Id(Integer trainerId, Pageable page);

    List<TrainingProgram> findAllByTrainer_Id(Integer trainerId);

    List<TrainingProgram> findTop5ByOrderByCreatedAtDesc();
}
