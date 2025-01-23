package dev.gethealthy.app.models.responses;

import dev.gethealthy.app.models.enums.TrainingProgramDifficulty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Data
public class TrainingProgramResponse {
    private Integer id;
    private String name;
    private TrainingProgramDifficulty difficulty;
    private String description;
    private Instant createdAt;
    private String imageFilePath;
    private Double rating;
    private List<CategoryResponse> categories;
    private Integer trainerId;
    private String trainerFirstName;
    private String trainerLastName;
    private Integer currentlyEnrolled;
}
