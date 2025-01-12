package dev.gethealthy.app.models.responses;

import lombok.Data;

import java.time.Instant;

@Data
public class ProgramListingResponse {
    private Integer id;
    private String name;
    private Instant createdAt;
    private String description;
    private String trainerName;
}
