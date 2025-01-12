package dev.gethealthy.app.models.entities;

import dev.gethealthy.app.base.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "training_program_application")
public class TrainingProgramApplication implements BaseEntity<TrainingProgramApplicationId> {
    @EmbeddedId
    private TrainingProgramApplicationId id;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "UserId", nullable = false)
    private Trainee trainee;

    @MapsId("programId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "ProgramId", nullable = false)
    private TrainingProgram program;

    @NotNull
    @Column(name = "MarkRead", nullable = false)
    private Boolean markRead = false;

    @NotNull
    @Column(name = "SubmissionDate", nullable = false)
    private Instant submissionDate;

    @Size(max = 512)
    @Column(name = "Note", length = 512)
    private String note;

}