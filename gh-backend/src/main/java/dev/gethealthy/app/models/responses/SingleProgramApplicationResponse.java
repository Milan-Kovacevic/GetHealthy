package dev.gethealthy.app.models.responses;

import dev.gethealthy.app.models.enums.Gender;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true)
@Data
public class SingleProgramApplicationResponse extends ProgramApplicationResponse {
    private Integer traineeHeight;
    private Double traineeWeight;
    private String traineeMedicalHistory;
    private LocalDate traineeDateOfBirth;
    private Gender traineeGender;
}
