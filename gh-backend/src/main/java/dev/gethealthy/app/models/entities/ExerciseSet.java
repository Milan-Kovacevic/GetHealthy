package dev.gethealthy.app.models.entities;

import dev.gethealthy.app.base.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "exercise_set")
public class ExerciseSet implements BaseEntity<Integer> {
    @Id
    @Column(name = "RepId", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ProgramExericseId", nullable = false)
    private TrainingProgramExercise programExericse;

    @Column(name = "Repetitions", nullable = false)
    private Integer repetitions;

    @Column(name = "RestTime", nullable = false)
    private Integer restTime;

    @Column(name = "MetricValue", nullable = false, length = 45)
    private String metricValue;

}