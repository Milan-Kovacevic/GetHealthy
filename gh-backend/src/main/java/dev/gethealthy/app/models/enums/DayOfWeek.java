package dev.gethealthy.app.models.enums;

import lombok.Getter;

@Getter
public enum DayOfWeek {

    MONDAY((byte) 1),
    TUESDAY((byte) 2),
    WEDNESDAY((byte) 3),
    THURSDAY((byte) 4),
    FRIDAY((byte) 5),
    SATURDAY((byte) 6),
    SUNDAY((byte) 7);

    private final byte value;

    DayOfWeek(byte value) {
        this.value = value;
    }

    public static DayOfWeek fromValue(String value) {
        for (DayOfWeek dayOfWeek : DayOfWeek.values()) {
            if (dayOfWeek.name().equals(value)) {
                return dayOfWeek;
            }
        }
        throw new IllegalArgumentException("Unknown DayOfWeek value: " + value);
    }

    @Override
    public String toString() {
        return name();
    }
}
