package dev.gethealthy.app.models.entities;

import dev.gethealthy.app.base.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "trainee_exercising")
public class TraineeExercising implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ProgramId", nullable = false)
    private TrainingProgram program;

    @NotNull
    @Column(name = "DateTaken", nullable = false)
    private Instant dateTaken = Instant.now();

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "UserId", nullable = false)
    private Trainee trainee;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ProgramScheduleId")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private TrainingProgramOnSchedule programSchedule;

    @OneToMany(mappedBy = "traineeExercising")
    private List<ExerciseFeedback> exercisesFeedback;

}