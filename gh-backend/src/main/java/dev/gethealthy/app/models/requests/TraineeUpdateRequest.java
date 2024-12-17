package dev.gethealthy.app.models.requests;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class TraineeUpdateRequest extends UserUpdateRequest {
    @Min(0)
    @Max(300)
    private Integer height;
    @Min(0)
    @Max(1000)
    private Double weight;
    private String medicalHistory;
}