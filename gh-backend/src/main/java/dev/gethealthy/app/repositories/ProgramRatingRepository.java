package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.ProgramRating;
import dev.gethealthy.app.models.entities.ProgramRatingId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface ProgramRatingRepository extends JpaRepository<ProgramRating, ProgramRatingId> {
    Optional<ProgramRating> findByProgram_IdAndUser_Id(Integer programId, Integer userId);
}
