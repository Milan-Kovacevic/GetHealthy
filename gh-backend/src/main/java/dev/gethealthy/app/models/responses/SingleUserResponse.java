package dev.gethealthy.app.models.responses;

import java.util.Date;

import dev.gethealthy.app.models.enums.Gender;
import lombok.Data;

@Data
public class SingleUserResponse {
    private String firstName;
    private String lastName;
    private Date dateOfBirth;
    private Gender gender;
    private String profilePictureFilePath;
    private UserAccountResponse userAccount;
}
