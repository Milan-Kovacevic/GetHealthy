package dev.gethealthy.app.models.requests;

import dev.gethealthy.app.models.enums.Role;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Data
@Getter
@Setter
public class UserRegistrationRequest {
    @NotBlank
    private String username;

    @NotBlank
    private String password;

    @NotBlank
    private String email;

    @NotBlank
    private Role role;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;
}
