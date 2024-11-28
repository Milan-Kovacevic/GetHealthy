package dev.gethealthy.app.models.entities;

import dev.gethealthy.app.base.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@Entity
@Table(name = "trainer")
public class Trainer implements BaseEntity<Integer> {
    @Id
    @Column(name = "UserId", nullable = false)
    private Integer id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "UserId", nullable = false)
    private User user;

    @Column(name = "Biography", length = 512)
    private String biography;

    @Column(name = "ContactInfo", length = 128)
    private String contactInfo;

    @Column(name = "ProfilePictureFilePath", length = 192)
    private String profilePictureFilePath;

}