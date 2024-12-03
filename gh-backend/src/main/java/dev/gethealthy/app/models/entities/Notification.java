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
@Table(name = "notification")
public class Notification implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NotificationId", nullable = false)
    private Integer id;

    @NotNull
    @Column(name = "MarkRead", nullable = false)
    private Boolean markRead = false;

    @Size(max = 128)
    @NotNull
    @Column(name = "ProgramName", nullable = false, length = 128)
    private String programName;

    @NotNull
    @Column(name = "Date", nullable = false)
    private Instant date;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "UserId", nullable = false)
    private User user;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "SenderId", nullable = false)
    private User sender;

    @NotNull
    @Column(name = "NotificationType", nullable = false)
    private Byte notificationType;

}