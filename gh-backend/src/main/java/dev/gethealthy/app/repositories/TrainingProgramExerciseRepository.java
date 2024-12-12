package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.TrainingProgramExercise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrainingProgramExerciseRepository extends JpaRepository<TrainingProgramExercise, Integer> {

    List<TrainingProgramExercise> findAllByProgram_Id(Integer programId);
}
