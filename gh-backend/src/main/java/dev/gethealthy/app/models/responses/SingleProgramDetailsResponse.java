package dev.gethealthy.app.models.responses;

import lombok.Data;

import java.util.List;

@Data
public class SingleProgramDetailsResponse {
    private String requirements;
    private Integer trainingDuration;
    private List<ProgramExerciseDetailsResponse> exercises;
}
