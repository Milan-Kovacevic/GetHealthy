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
@Table(name = "exercise")
public class Exercise implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ExerciseId", nullable = false)
    private Integer id;

    @Size(max = 128)
    @NotNull
    @Column(name = "Name", nullable = false, length = 128)
    private String name;

    @Size(max = 512)
    @Column(name = "Description", length = 512)
    private String description;

    @Size(max = 192)
    @Column(name = "VideoLink", length = 192)
    private String videoLink;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FirstExerciseMetricId")
    private ExerciseMetric firstExerciseMetric;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SecondExerciseMetricId")
    private ExerciseMetric secondExerciseMetric;

}