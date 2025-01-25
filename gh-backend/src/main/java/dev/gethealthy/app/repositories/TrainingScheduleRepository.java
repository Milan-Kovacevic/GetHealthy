package dev.gethealthy.app.repositories;

import dev.gethealthy.app.models.entities.TrainingProgramOnSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrainingScheduleRepository extends JpaRepository<TrainingProgramOnSchedule, Integer> {
    List<TrainingProgramOnSchedule> findAllByProgramIdIn(List<Integer> programIds);
}
