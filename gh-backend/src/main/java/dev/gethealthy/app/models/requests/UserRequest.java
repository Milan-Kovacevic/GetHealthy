package dev.gethealthy.app.models.requests;

import java.time.LocalDate;

import lombok.Data;

@Data
public class UserRequest {
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    private Byte gender;
    private String profilePictureFilePath;
}
