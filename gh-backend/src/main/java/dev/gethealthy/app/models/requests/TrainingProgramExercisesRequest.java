package dev.gethealthy.app.models.requests;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class TrainingProgramExercisesRequest {
    private List<TrainingProgramExerciseRequest> trainingProgramExercises;
}