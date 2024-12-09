package dev.gethealthy.app.models.responses;

import java.time.LocalDate;

import lombok.Data;

@Data
public class UserResponse {
    private Integer id;
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    private Byte gender;
    private String profilePictureFilePath;
}
