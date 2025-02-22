package dev.gethealthy.app.models.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.util.Objects;

@Getter
@Setter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class TrainingProgramApplicationId implements java.io.Serializable {
    private static final long serialVersionUID = -1125321856000405723L;
    @NotNull
    @Column(name = "UserId", nullable = false)
    private Integer userId;

    @NotNull
    @Column(name = "ProgramId", nullable = false)
    private Integer programId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        TrainingProgramApplicationId entity = (TrainingProgramApplicationId) o;
        return Objects.equals(this.userId, entity.userId) &&
                Objects.equals(this.programId, entity.programId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, programId);
    }

}