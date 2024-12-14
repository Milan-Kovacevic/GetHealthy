package dev.gethealthy.app.models.responses;

import dev.gethealthy.app.models.enums.Gender;
import lombok.Data;

import java.util.Date;

@Data
public class TrainingProgramApplicationResponse {
    private Integer id;
    private Boolean markRead;
    private Date submissionDate;
    private String note;
    private Integer trainingProgramId;
    private String trainingProgramName;
    private String traineeFirstName;
    private String traineeLastName;
    private Gender traineeGender;
}
