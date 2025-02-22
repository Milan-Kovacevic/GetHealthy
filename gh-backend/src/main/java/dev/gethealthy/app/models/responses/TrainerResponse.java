package dev.gethealthy.app.models.responses;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class TrainerResponse extends SingleUserResponse {
    private String biography;
    private String contactInfo;
    private String email;
    private String certificateFilePath;
}
