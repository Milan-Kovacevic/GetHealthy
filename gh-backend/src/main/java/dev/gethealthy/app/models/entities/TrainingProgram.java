package dev.gethealthy.app.models.entities;

import dev.gethealthy.app.base.BaseEntity;
import dev.gethealthy.app.models.enums.TrainingProgramDifficulty;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;
import java.util.List;

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
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "Difficulty", nullable = false)
    private TrainingProgramDifficulty difficulty;

    @NotNull
    @Column(name = "TrainingDuration", nullable = false)
    private Integer trainingDuration;

    @Size(max = 512)
    @Column(name = "Description", length = 512, nullable = false)
    private String description;

    @Size(max = 512)
    @Column(name = "Requirements", length = 512)
    private String requirements;

    @NotNull
    @Column(name = "CreatedAt", nullable = false)
    private LocalDate createdAt = LocalDate.now();

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "UserId", nullable = false)
    private Trainer trainer;

    @OneToMany(fetch = FetchType.EAGER) // TODO: LAZY??
    @JoinColumn(name = "ProgramId")
    private List<ProgramRating> trainingProgramRatings;

    @OneToMany(fetch = FetchType.EAGER)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "CategoryId", nullable = false)
    @JoinTable(
            name = "training_program_category",
            joinColumns = @JoinColumn(name = "ProgramId"),
            inverseJoinColumns = @JoinColumn(name = "CategoryId")
    )
    private List<Category> categories;

    //@OnDelete(action = OnDeleteAction.CASCADE)
    //@JoinColumn(name = "ExerciseId", nullable = false)
    @ManyToMany(fetch = FetchType.EAGER, cascade = { CascadeType.PERSIST, CascadeType.MERGE }) // TODO: ???
    @JoinTable(
            name = "training_program_exercise",
            joinColumns = @JoinColumn(name = "ProgramId"),
            inverseJoinColumns = @JoinColumn(name = "ExerciseId")
    )
    private List<Exercise> exercises;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "ProgramId")
    private List<TrainingProgramExercise> trainingProgramExercises;

    @Column(name = "Deleted")
    private Boolean deleted = false;

    @Size(max = 255)
    @Column(name = "ImageFilePath")
    private String imageFilePath;
}