package dev.gethealthy.app.models.entities;

import dev.gethealthy.app.base.BaseEntity;
import jakarta.persistence.*;
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
    @Column(name = "ExerciseId", nullable = false)
    private Integer id;

    @Column(name = "ExerciseName", nullable = false, length = 128)
    private String exerciseName;

    @Column(name = "Description", length = 512)
    private String description;

    @Column(name = "VideoLink", length = 192)
    private String videoLink;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "UserId", nullable = false)
    private Trainer user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "MetricType1Id", nullable = false)
    private MetricType metricType1Id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "MatricType2Id", nullable = false)
    private MetricType matricType2Id;

}