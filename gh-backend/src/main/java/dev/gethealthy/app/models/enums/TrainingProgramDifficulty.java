package dev.gethealthy.app.models.enums;

import lombok.Getter;

@Getter
public enum TrainingProgramDifficulty {
    BEGINNER("Beginner"),
    INTERMEDIATE("Intermediate"),
    ADVANCED("Advanced");

    private final String name;

    private TrainingProgramDifficulty(String name) {
        this.name = name;
    }

}
