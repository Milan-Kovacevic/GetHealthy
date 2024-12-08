package dev.gethealthy.app.models.responses;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
public class SingleTrainingProgramApplicationResponse extends TrainingProgramApplicationResponse{
    private Integer traineeHeight;
    private Double traineeWeight;
    private String traineeMedicalHistory;
    private Date traineeDateOfBirth;
}
