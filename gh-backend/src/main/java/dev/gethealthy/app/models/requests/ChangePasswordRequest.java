package dev.gethealthy.app.models.requests;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ChangePasswordRequest {
    @NotNull
    private Integer userAccountId;
    private String currentPassword;
    private String newPassword;
    private String confirmedNewPassword;
}
