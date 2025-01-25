package dev.gethealthy.app.models.responses;

import dev.gethealthy.app.models.enums.Role;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class AuthUserResponse {
    private int id;
    private String firstName;
    private String lastName;
    private String profilePictureFilePath;
    private Role role;
}
