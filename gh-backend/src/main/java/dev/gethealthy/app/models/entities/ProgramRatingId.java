package dev.gethealthy.app.models.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class ProgramRatingId implements Serializable {
    @NotNull
    @Column(name = "ProgramId", nullable = false)
    private Integer programId;
    @NotNull
    @Column(name = "UserId", nullable = false)
    private Integer userId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ProgramRatingId entity = (ProgramRatingId) o;
        return Objects.equals(this.userId, entity.userId) &&
                Objects.equals(this.programId, entity.programId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, programId);
    }
}
