package dev.gethealthy.app.models.entities;

import dev.gethealthy.app.base.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "comment")
public class Comment implements BaseEntity<Integer> {
    @Id
    @Column(name = "CommentId", nullable = false)
    private Integer id;

    @Column(name = "Content", nullable = false, length = 512)
    private String content;

    @Column(name = "DatePosted", nullable = false)
    private Instant datePosted;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "UserId", nullable = false)
    private Trainee user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "ProgramId", nullable = false)
    private TrainingProgram program;

}