package dev.gethealthy.app.models.entities;

import dev.gethealthy.app.base.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "training_program")
public class TrainingProgram implements BaseEntity<Integer> {
    @Id
    @Column(name = "ProgramId", nullable = false)
    private Integer id;

    @Column(name = "ProgramName", nullable = false, length = 128)
    private String programName;

    @Column(name = "Info", length = 512)
    private String info;

    @Column(name = "Requirements", length = 512)
    private String requirements;

    @Column(name = "CreatedAt", nullable = false)
    private LocalDate createdAt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "UserId", nullable = false)
    private Trainer user;

}