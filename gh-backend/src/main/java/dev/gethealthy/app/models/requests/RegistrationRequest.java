package dev.gethealthy.app.models.requests;

import dev.gethealthy.app.models.enums.Role;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;


@Data
@Getter
@Setter
public class RegistrationRequest {
    @NotBlank
    private String username;

    @NotBlank
    private String password;

    @NotBlank
    private String email;

    @NotBlank
    private Role role;

    @NotBlank
    private String FirstName;

    @NotBlank
    private String LastName;

    private MultipartFile file;
}
