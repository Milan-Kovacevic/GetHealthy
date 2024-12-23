package dev.gethealthy.app.models.enums;

import lombok.Getter;

@Getter
public enum TrainingProgramDifficulty {
    BEGINNER("Beginner"),
    INTERMEDIATE("Intermediate"),
    ADVANCED("Advanced");
    //SOMETHING4TH("Something4th"); // TODO: ??? cause db doesn't work well with the enum types

    private final String name;

    private TrainingProgramDifficulty(String name) {
        this.name = name;
    }

}
