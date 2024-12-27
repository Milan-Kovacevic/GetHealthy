package dev.gethealthy.app.models.responses;

import dev.gethealthy.app.models.enums.TrainingProgramDifficulty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
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
    private Instant createdAt;
    private String imageFilePath;
    private double rating;
    private List<CategoryResponse> categories;
    private Integer trainerId;
    private String trainerFirstName;
    private String trainerLastName;


}
