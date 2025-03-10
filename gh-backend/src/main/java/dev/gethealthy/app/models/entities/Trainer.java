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

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "trainer")
public class Trainer extends User implements BaseEntity<Integer> {
    @Size(max = 512)
    @Column(name = "Biography", length = 512)
    private String biography;

    @Size(max = 32)
    @Column(name = "ContactInfo", length = 32)
    private String contactInfo;
}