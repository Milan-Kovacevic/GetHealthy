package dev.gethealthy.app.models.requests;

import lombok.Data;

@Data
public class TrainerRequest {
    private Integer id;
    private UserRequest user;
    private String biography;
    private String contactInfo;
    private String email;
}
