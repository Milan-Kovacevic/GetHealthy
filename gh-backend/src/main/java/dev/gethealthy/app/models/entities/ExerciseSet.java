package dev.gethealthy.app.models.entities;

import dev.gethealthy.app.base.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "exercise_set")
public class ExerciseSet implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ExerciseSetId", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ProgramExericseId", nullable = false)
    private TrainingProgramExercise programExercise;

    @NotNull
    @Column(name = "RestTime", nullable = false)
    private Integer restTime;

    @Size(max = 128)
    @NotNull
    @Column(name = "FirstMetricValue", nullable = false, length = 128)
    private String firstMetricValue;

    @Size(max = 128)
    @Column(name = "SecondMetricValue", length = 128)
    private String secondMetricValue;


}