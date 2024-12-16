package dev.gethealthy.app.models.responses;

import dev.gethealthy.app.models.enums.Gender;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDate;

@Data
public class SingleProgramParticipantResponse {
    private Integer id;
    private String firstName;
    private String lastName;
    private Gender gender;
    private LocalDate dateOfBirth;
    private String profilePictureFilePath;
    private Double height;
    private Double weight;
    private String medicalHistory;
    private Instant joinDate;
}
