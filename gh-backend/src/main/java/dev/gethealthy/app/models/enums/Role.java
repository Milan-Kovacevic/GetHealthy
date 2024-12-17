package dev.gethealthy.app.models.enums;

public enum Role {
    ADMIN((byte) 1), TRAINEE((byte) 2), TRAINER((byte) 3);

    private final byte value;

    Role(byte value) {
        this.value = value;
    }

    public byte getValue() {
        return value;
    }

    public static Role fromValue(String value) {
        for (Role role : Role.values()) {
            if (role.name().equals(value)) {
                return role;
            }
        }
        throw new IllegalArgumentException("Unknown Role value: " + value);
    }

    @Override
    public String toString() {
        return name();
    }
}
