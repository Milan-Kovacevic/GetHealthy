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
@Table(name = "notification")
public class Notification implements BaseEntity<Integer> {
    @Id
    @Column(name = "NotificationId", nullable = false)
    private Integer id;

    @Column(name = "MarkRead", nullable = false)
    private Boolean markRead = false;

    @Column(name = "ProgramName", nullable = false, length = 128)
    private String programName;

    @Column(name = "Date", nullable = false)
    private Instant date;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "UserId", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "SenderId", nullable = false)
    private User sender;

    @Column(name = "NotificationType", nullable = false)
    private Byte notificationType;

}