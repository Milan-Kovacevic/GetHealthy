package dev.gethealthy.app.models.entities;

import dev.gethealthy.app.base.BaseEntity;
import dev.gethealthy.app.models.enums.DayOfWeek;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "training_program_on_schedule")
public class TrainingProgramOnSchedule implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", nullable = false)
    private Integer id;

    @NotNull
    @Column(name = "StartTime", nullable = false)
    private LocalTime startTime;

    @NotNull
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "DayOfWeek", nullable = false)
    private DayOfWeek dayOfWeek;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "ProgramId", nullable = false)
    private TrainingProgram program;

    @OneToMany(mappedBy = "trainingProgramOnSchedule")
    private List<TraineeExercising> traineeExercisings;
}