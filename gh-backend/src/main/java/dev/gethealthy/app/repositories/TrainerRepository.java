package dev.gethealthy.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.gethealthy.app.models.entities.Trainer;

public interface TrainerRepository extends JpaRepository<Trainer, Integer> {

}
