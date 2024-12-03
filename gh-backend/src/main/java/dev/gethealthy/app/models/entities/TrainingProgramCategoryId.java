package dev.gethealthy.app.models.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.util.Objects;

@Getter
@Setter
@Embeddable
public class TrainingProgramCategoryId implements java.io.Serializable {
    private static final long serialVersionUID = -39041558448567269L;
    @Column(name = "CategoryId", nullable = false)
    private Integer categoryId;

    @Column(name = "ProgramId", nullable = false)
    private Integer programId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        TrainingProgramCategoryId entity = (TrainingProgramCategoryId) o;
        return Objects.equals(this.categoryId, entity.categoryId) &&
                Objects.equals(this.programId, entity.programId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(categoryId, programId);
    }

}