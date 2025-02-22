package dev.gethealthy.app.models.requests;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class TrainingProgramExerciseRequest {
    private Integer id;
    private Integer exerciseId;
    private Integer position;
    private Integer programId;
    private List<ExerciseSetRequest> exerciseSets;
    private Integer programExerciseId; // TODO: ???
}
