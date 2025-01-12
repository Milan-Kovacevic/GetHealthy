package dev.gethealthy.app.models.responses;

import dev.gethealthy.app.models.enums.Gender;
import lombok.Data;

import java.time.Instant;

@Data
public class ProgramApplicationResponse {
    private Integer programId;
    private Integer traineeId;
    private Boolean markRead;
    private Instant submissionDate;
    private String note;
    private String trainingProgramName;
    private String traineeFirstName;
    private String traineeLastName;
    private String traineeProfilePictureFilePath;
}
