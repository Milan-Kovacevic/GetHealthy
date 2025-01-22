package dev.gethealthy.app.models.responses;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Data
public class LoginResponse {
    private TokensResponse tokens;
    private AuthUserResponse user;
}
