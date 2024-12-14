package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.TrainingProgram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface TrainingProgramRepository extends JpaRepository<TrainingProgram, Integer>, JpaSpecificationExecutor<TrainingProgram>{
    @Query("SELECT COUNT(e.id) from TraineeOnTrainingProgram e WHERE e.program.id = ?1")
    Integer calculateNumberOfTrainingProgramTrainees(Integer programId);

    @Query("SELECT COUNT(e.id) from ProgramRating e WHERE e.program.id = ?1")
    Integer calculateNumberOfTrainingProgramRatings(Integer programId);

    @Query("SELECT ROUND(AVG(e.rate), 1) FROM ProgramRating e WHERE e.program.id = ?1")
    Double calculateTrainingProgramAverageRate(Integer programId);
}
