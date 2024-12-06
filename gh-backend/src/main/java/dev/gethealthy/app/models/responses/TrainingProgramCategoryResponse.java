package dev.gethealthy.app.models.responses;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class TrainingProgramCategoryResponse {
    private CategoryResponse category;
}
