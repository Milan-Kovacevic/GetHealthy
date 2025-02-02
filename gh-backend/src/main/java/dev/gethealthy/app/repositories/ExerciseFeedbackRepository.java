package dev.gethealthy.app.repositories;

import dev.gethealthy.app.base.BaseEntity;
import dev.gethealthy.app.models.entities.ExerciseFeedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

public interface ExerciseFeedbackRepository extends JpaRepository<ExerciseFeedback, Integer> {
    boolean existsByTraineeExercising_IdAndProgramExercise_Id(Integer traineeExercisingId, Integer programExerciseId);

}
