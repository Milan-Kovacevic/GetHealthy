package dev.gethealthy.app.models.responses;

import dev.gethealthy.app.models.enums.Gender;
import lombok.Data;

import java.time.Instant;
import java.util.Date;

@Data
public class TrainingProgramApplicationResponse {
    private Integer programId;
    private Integer traineeId;
    private Boolean markRead;
    private Instant submissionDate;
    private String note;
    private Integer trainingProgramId;
    private String trainingProgramName;
    private String traineeFirstName;
    private String traineeLastName;
    private Gender traineeGender;
}
