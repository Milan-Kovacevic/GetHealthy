package dev.gethealthy.app.models.responses;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class TrainingProgramInfoResponse extends TrainingProgramResponse{
    private Integer totalRates;
    private Boolean joined;
}
