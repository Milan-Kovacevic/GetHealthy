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
@Table(name = "exercise_set_feedback")
public class ExerciseSetFeedback implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ExerciseFeedbackId", nullable = false)
    private ExerciseFeedback exerciseFeedback;

    @Column(name = "Skipped", nullable = false)
    private Boolean skipped;

    @Column(name = "Completed", nullable = false)
    private Boolean completed;

    @Size(max = 128)
    @Column(name = "FirstMetricValueFeedback", length = 128)
    private String firstMetricValueFeedback;

    @Size(max = 128)
    @Column(name = "SecondMetricValueFeedback", length = 128)
    private String secondMetricValueFeedback;

}