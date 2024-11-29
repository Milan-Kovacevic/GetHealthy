package dev.gethealthy.app.models.entities;

import dev.gethealthy.app.base.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "trainee")
public class Trainee implements BaseEntity<Integer> {
    @Id
    @Column(name = "UserId", nullable = false)
    private Integer id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "UserId", nullable = false)
    private User user;

    @Column(name = "Height")
    private Integer height;

    @Column(name = "Weight", precision = 6, scale = 2)
    private BigDecimal weight;

    @Column(name = "MedicalHistory", length = 512)
    private String medicalHistory;

}