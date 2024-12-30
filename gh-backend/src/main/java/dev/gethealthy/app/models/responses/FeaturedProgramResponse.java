package dev.gethealthy.app.models.responses;

import dev.gethealthy.app.models.enums.TrainingProgramDifficulty;
import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
public class FeaturedProgramResponse {
    private Integer id;
    private String name;
    private TrainingProgramDifficulty difficulty;
    private String description;
    private Instant createdAt;
    private String imageFilePath;
    private double rating;
    private List<CategoryResponse> categories;
    private Integer participants;
    private Integer trainerId;
    private String trainerFirstName;
    private String trainerLastName;
}
