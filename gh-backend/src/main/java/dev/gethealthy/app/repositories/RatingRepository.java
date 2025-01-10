package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.ProgramRating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.Date;
import java.util.List;

public interface RatingRepository extends JpaRepository<ProgramRating, Integer> {

    List<ProgramRating> getProgramRatingByProgramId(Integer programId);
}
