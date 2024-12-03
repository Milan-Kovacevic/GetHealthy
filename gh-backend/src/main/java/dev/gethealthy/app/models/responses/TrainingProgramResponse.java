package dev.gethealthy.app.models.responses;

import dev.gethealthy.app.models.entities.Trainer;

import java.time.LocalDate;

public class TrainingProgramResponse {
    private Integer id;

    private String name;

    private Byte difficulty;

    private Integer trainingDuration;

    private String description;

    private String requirements;

    private LocalDate createdAt;

    private Trainer user;
}
