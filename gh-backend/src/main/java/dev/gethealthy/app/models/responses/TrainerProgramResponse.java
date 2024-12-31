package dev.gethealthy.app.models.responses;

import lombok.Data;

import java.time.Instant;
import java.time.LocalDate;

@Data
public class TrainerProgramResponse {
    private Integer id;
    private String name;
    private Instant createdAt;
}
