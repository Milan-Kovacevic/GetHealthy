package dev.gethealthy.app.models.entities;

import dev.gethealthy.app.base.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "training_program")
public class TrainingProgram implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ProgramId", nullable = false)
    private Integer id;

    @Size(max = 128)
    @NotNull
    @Column(name = "Name", nullable = false, length = 128)
    private String name;

    @NotNull
    @Column(name = "Difficulty", nullable = false)
    private Byte difficulty;

    @NotNull
    @Column(name = "TrainingDuration", nullable = false)
    private Integer trainingDuration;

    @Size(max = 512)
    @Column(name = "Description", length = 512)
    private String description;

    @Size(max = 512)
    @Column(name = "Requirements", length = 512)
    private String requirements;

    @NotNull
    @Column(name = "CreatedAt", nullable = false)
    private LocalDate createdAt;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "UserId", nullable = false)
    private Trainer user;

    @Column(name = "Deleted")
    private Boolean deleted;

}