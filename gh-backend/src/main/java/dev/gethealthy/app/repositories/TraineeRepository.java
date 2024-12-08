package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.Trainee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface TraineeRepository extends JpaRepository<Trainee, Integer> {

}
