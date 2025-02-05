package dev.gethealthy.app.models.responses;

import dev.gethealthy.app.models.enums.Gender;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserResponse {
    private Integer id;
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    private Gender gender;
    private String profilePictureFilePath;
}
