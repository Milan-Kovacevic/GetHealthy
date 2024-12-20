package dev.gethealthy.app.models.responses;

import dev.gethealthy.app.models.enums.TrainingProgramDifficulty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Data
public class TrainingProgramResponse {
    private Integer id;

    private String name;

    private TrainingProgramDifficulty difficulty;

    private Integer trainingDuration;

    private String description;

    private String requirements;

    private LocalDate createdAt;

    private List<CategoryResponse> categories; // TODO: ???? CategoryResponse

    private List<ExerciseResponse> exercises;

    private double rating;

    private TrainerResponse trainer; // TODO: ????
    //private Trainer user; // TODO: ????
   // private String trainerFirstName;

   // private String trainerLastName;

   // private String imageFilePath;

}
