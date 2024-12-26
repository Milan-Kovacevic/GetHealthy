package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.Qualification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QualificationRepository extends JpaRepository<Qualification, Integer> {

}
