package dev.gethealthy.app.models.requests;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TrainingProgramApplicationRequest {
    @NotNull
    private Integer programId;
    private String note;
}
