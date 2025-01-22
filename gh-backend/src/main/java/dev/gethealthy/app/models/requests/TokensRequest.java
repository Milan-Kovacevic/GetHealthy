package dev.gethealthy.app.models.requests;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class TokensRequest {
    private String refreshToken;
}
