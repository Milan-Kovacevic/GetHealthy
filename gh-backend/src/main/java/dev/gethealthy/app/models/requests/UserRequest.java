package dev.gethealthy.app.models.requests;

import dev.gethealthy.app.models.enums.Gender;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserRequest {
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    private Gender gender;
    private String profilePictureFilePath;
}
