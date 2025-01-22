package dev.gethealthy.app.models.requests;

import lombok.Data;

import java.util.List;

@Data
public class AddProgramExerciseRequest {
    private Integer exerciseId;
    private Integer position;
    private List<AddExerciseSetRequest> exerciseSets;
}
