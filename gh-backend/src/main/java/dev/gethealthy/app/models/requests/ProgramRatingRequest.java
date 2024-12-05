package dev.gethealthy.app.models.requests;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProgramRatingRequest {
    @NotNull
    @Min(0)
    @Max(5)
    private Integer rate;
    @NotNull
    private Integer traineeId;
}
