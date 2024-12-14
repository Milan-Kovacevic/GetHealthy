package dev.gethealthy.app.models.responses;

import lombok.Data;

import java.time.Instant;

@Data
public class SingleProgramParticipantResponse {
    private Integer id;
    private String firstName;
    private String lastName;
    private Byte gender;
    private Instant dateOfBirth;
    private String profilePictureFilePath;
    private Double height;
    private Double weight;
    private String medicalHistory;
}
