package dev.gethealthy.app.models.responses;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class TokensResponse {
    public String accessToken;

    public String refreshToken;
}
