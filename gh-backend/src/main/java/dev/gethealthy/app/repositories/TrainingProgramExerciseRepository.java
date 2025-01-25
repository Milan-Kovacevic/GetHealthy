package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.TrainingProgramExercise;
import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TrainingProgramExerciseRepository extends JpaRepository<TrainingProgramExercise, Integer> {

    List<TrainingProgramExercise> findAllByProgram_Id(Integer programId);

    @Transactional
    @Modifying
    @Query("DELETE FROM TrainingProgramExercise t WHERE t.program.id = :programId")
    void deleteByProgram_Id(@Param("programId") Integer programId);

    List<TrainingProgramExercise> findByExerciseIdAndProgramId(Integer ExerciseId, Integer ProgramId);
}
