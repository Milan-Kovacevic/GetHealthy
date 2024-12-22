package dev.gethealthy.app.models.entities;

import dev.gethealthy.app.base.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "exercise_feedback")
public class ExerciseFeedback implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", nullable = false)
    private Integer id;

    @Column(name = "Skipped", nullable = false)
    private Boolean skipped;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "TraineeExercisingId", nullable = false)
    private TraineeExercising traineeExercising;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ExerciseId", nullable = false)
    private Exercise exercise;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ProgramExerciseId")
    private TrainingProgramExercise programExercise;

    @OneToMany(mappedBy = "exerciseFeedback")
    private List<ExerciseSetFeedback> exerciseSetsFeedback;

}