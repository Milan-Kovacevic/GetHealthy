package dev.gethealthy.app.models.responses;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@EqualsAndHashCode(callSuper = true)
@Data
@Getter
@Setter
public class LoginResponse extends UserAccountResponse {
    private String token;
}
