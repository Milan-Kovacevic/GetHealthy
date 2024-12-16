package dev.gethealthy.app.models.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Gender {
    MALE("Male"),
    FEMALE("Female");

    private final String name;

    private Gender(String name) {
        this.name = name;
    }
    @JsonValue
    public String getName() {
        return name;
    }
}
