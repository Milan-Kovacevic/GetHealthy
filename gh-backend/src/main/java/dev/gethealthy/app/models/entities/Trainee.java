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

import java.math.BigDecimal;

@Data
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "trainee")
public class Trainee extends User implements BaseEntity<Integer> {
    @Column(name = "Height", precision = 6, scale = 2)
    private BigDecimal height;

    @Column(name = "Weight", precision = 6, scale = 2)
    private BigDecimal weight;

    @Size(max = 512)
    @Column(name = "MedicalHistory", length = 512)
    private String medicalHistory;

}