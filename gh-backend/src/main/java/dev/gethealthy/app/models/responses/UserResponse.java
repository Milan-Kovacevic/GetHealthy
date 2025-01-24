package dev.gethealthy.app.models.responses;

import java.time.Instant;
import java.time.LocalDate;

import dev.gethealthy.app.models.enums.Gender;
import lombok.Data;

@Data
public class UserResponse {
    private Integer id;
    private String firstName;
    private String lastName;
    private Instant dateOfBirth;
    private Gender gender;
    private String profilePictureFilePath;
}
