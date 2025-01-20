package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.Exercise;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import dev.gethealthy.app.models.entities.Trainer;
import org.springframework.data.jpa.repository.Query;

public interface TrainerRepository extends JpaRepository<Trainer, Integer> {
    @Query("SELECT e.certificationFilePath from Qualification e WHERE e.id=:trainerId")
    String getCertificateFilePath(Integer trainerId);
}
