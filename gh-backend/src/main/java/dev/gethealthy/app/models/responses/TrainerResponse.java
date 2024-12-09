package dev.gethealthy.app.models.responses;

import lombok.Data;

@Data
public class TrainerResponse {
    private Integer id;
    private UserResponse user;
    private String biography;
    private String contactInfo;
}
