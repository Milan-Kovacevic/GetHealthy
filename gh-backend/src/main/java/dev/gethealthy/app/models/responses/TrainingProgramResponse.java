package dev.gethealthy.app.models.responses;

import dev.gethealthy.app.models.entities.Trainer;
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

    private Byte difficulty;

    private Integer trainingDuration;

    private String description;

    private String requirements;

    private LocalDate createdAt;

    private List<TrainingProgramCategoryResponse> trainingProgramCategoryList;

    private double rating;

    private Trainer user;
}
