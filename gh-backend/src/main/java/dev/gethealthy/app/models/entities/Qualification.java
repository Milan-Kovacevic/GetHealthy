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
@Table(name = "qualification")
public class Qualification implements BaseEntity<Integer> {
    @Id
    @Column(name = "UserId", nullable = false)
    private Integer id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "UserId", nullable = false)
    private Trainer trainer;

    @Column(name = "QualificationName", nullable = false, length = 128)
    private String qualificationName;

    @Column(name = "ValidTo", nullable = false)
    private LocalDate validTo;

    @Column(name = "CertificationFilePath", nullable = false, length = 192)
    private String certificationFilePath;

    @Column(name = "Description", length = 512)
    private String description;

}