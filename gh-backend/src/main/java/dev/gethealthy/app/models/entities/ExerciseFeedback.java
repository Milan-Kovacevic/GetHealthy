package dev.gethealthy.app.models.entities;

import dev.gethealthy.app.base.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "exercise_feedback")
public class ExerciseFeedback implements BaseEntity<Integer> {
    @Id
    @Column(name = "Id", nullable = false)
    private Integer id;

    @Column(name = "Score", nullable = false)
    private Integer score;

    @Column(name = "Skipped", nullable = false)
    private Byte skipped;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "TraineeExercisingId", nullable = false)
    private TraineeExercising traineeExercising;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ExerciseId", nullable = false)
    private Exercise exercise;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ProgramExerciseId")
    private TrainingProgramExercise programExercise;

}