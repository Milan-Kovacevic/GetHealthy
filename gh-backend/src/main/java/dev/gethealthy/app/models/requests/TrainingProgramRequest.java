package dev.gethealthy.app.models.requests;

import dev.gethealthy.app.models.enums.TrainingProgramDifficulty;
import dev.gethealthy.app.models.responses.TrainingProgramCategoryResponse;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Data
public class TrainingProgramRequest {
    private String name;

    private TrainingProgramDifficulty difficulty;

    private Integer trainingDuration;

    private String description;

    private String requirements;

    private List<TrainingProgramCategoryRequest> categories;

    private List<TrainingProgramExerciseRequest> exercises;

    private Integer trainerId;

    private String imageFilePath;
}
