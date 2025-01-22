package dev.gethealthy.app.models.responses;

import dev.gethealthy.app.models.enums.TrainingProgramDifficulty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.List;

@Data
@Getter
@Setter
public class TrainingProgramScheduleResponse {
    private int id;
    private String name;
    private Instant createdAt;
    private String description;
    private int trainingDuration;
    private String trainerFirstName;
    private String trainerLastName;
    private TrainingProgramDifficulty difficulty;
    private List<CategoryResponse> categories;
}
