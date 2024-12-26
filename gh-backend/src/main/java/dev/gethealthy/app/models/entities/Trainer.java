package dev.gethealthy.app.models.entities;

import dev.gethealthy.app.base.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "trainer")
public class Trainer extends User implements BaseEntity<Integer> {

    /*
    @Column(name = "UserId", nullable = false)
    private Integer trainerId;
    */
    /*
    @MapsId
    @OneToOne(fetch = FetchType.EAGER, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "UserId", nullable = false)
    private User user;
     */

    @Size(max = 512)
    @Column(name = "Biography", length = 512)
    private String biography;

    @Size(max = 32)
    @Column(name = "ContactInfo", length = 32)
    private String contactInfo;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "UserId", nullable = false)
    private Qualification qualification;
}