package dev.gethealthy.app.models.enums;

import lombok.Getter;

@Getter
public enum Gender {
    MALE((byte) 1),
    FEMALE((byte) 2);

    private final byte value;

    Gender(byte value) {
        this.value = value;
    }

    public static Gender fromValue(String value) {
        for (Gender gender : Gender.values()) {
            if (gender.name().equals(value)) {
                return gender;
            }
        }
        throw new IllegalArgumentException("Unknown Gender value: " + value);
    }

    @Override
    public String toString() {
        return name();
    }
}