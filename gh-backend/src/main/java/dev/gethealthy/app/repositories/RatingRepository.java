package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.ProgramRating;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RatingRepository extends JpaRepository<ProgramRating, Integer> {

    double getAvgRatingByProgramId(Integer programId);
}
