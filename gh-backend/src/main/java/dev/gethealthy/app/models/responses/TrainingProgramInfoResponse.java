package dev.gethealthy.app.models.responses;

import dev.gethealthy.app.models.enums.TraineeProgramStatus;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class TrainingProgramInfoResponse extends TrainingProgramResponse{
    private Integer currentlyEnrolled;
    private Integer totalRates;
    private TraineeProgramStatus status;
}
