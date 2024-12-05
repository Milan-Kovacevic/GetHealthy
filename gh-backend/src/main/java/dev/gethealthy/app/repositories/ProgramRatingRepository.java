package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.ProgramRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface ProgramRatingRepository extends JpaRepository<ProgramRating, Integer> {
    @Query("SELECT COALESCE(AVG(e.rate), 0) from ProgramRating e WHERE e.program.id = ?1")
    Double calculateTrainingProgramAverageRating(Integer programId);

    List<ProgramRating> findAllByProgram_Id(Integer programId);

    Optional<ProgramRating> findByProgram_IdAndUser_Id(Integer programId, Integer userId);
}
