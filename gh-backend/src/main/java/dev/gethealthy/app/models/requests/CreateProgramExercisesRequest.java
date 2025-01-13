package dev.gethealthy.app.models.requests;

import jakarta.validation.Valid;
import lombok.Data;

import java.util.List;

@Data
public class CreateProgramExercisesRequest {
    private List<@Valid AddProgramExerciseRequest> trainingProgramExercises;
}
