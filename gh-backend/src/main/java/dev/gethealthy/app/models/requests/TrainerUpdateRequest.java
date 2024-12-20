package dev.gethealthy.app.models.requests;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class TrainerUpdateRequest extends UserUpdateRequest {
    private String biography;
    private String contactInfo;
}