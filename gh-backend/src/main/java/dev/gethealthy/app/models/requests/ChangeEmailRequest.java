package dev.gethealthy.app.models.requests;

import lombok.Data;

@Data
public class ChangeEmailRequest {
    private Integer userAccountId;
    private String email;
    private String confirmedPassword;
}
