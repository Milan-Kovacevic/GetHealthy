package dev.gethealthy.app.models.responses;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class TrainerInfoResponse extends UserInfoResponse {
    private String biography;
    private String contactInfo;
}
