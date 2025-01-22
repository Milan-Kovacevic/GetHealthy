package dev.gethealthy.app.models.entities;

import dev.gethealthy.app.base.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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

    @Size(max = 255)
    @Column(name = "VideoLink")
    private String videoLink;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "FirstExerciseMetricId", nullable = false)
    private ExerciseMetric firstExerciseMetric;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "SecondExerciseMetricId")
    private ExerciseMetric secondExerciseMetric;
}