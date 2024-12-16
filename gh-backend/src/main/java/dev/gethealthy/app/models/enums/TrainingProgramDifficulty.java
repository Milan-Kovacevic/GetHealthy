package dev.gethealthy.app.models.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum TrainingProgramDifficulty {
    BEGINNER("Beginner"),
    INTERMEDIATE("Intermediate"),
    ADVANCED("Advanced"),
    SOMETHING4TH("Something4th"); // cause db doesn't work well with the enum types

    private final String name;

    private TrainingProgramDifficulty(String name) {
        this.name = name;
    }
    @JsonValue
    public String getName() {
        return name;
    }
}
