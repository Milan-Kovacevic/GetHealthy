package dev.gethealthy.app.models.entities;

import dev.gethealthy.app.base.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "exercise_set_feedback")
public class ExerciseSetFeedback implements BaseEntity<Integer> {
    @Id
    @Column(name = "Id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "EXERCISE_FEEDBACK_Id", nullable = false)
    private ExerciseFeedback exerciseFeedback;

}