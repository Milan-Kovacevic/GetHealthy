package dev.gethealthy.app.models.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class EmailChangeRequest {
    @NotBlank
    private String email;
    @NotBlank
    private String confirmedPassword;
}
