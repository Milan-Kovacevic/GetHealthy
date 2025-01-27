package dev.gethealthy.app.models.enums;

import jdk.jfr.Timestamp;
import lombok.Getter;

@Getter
public enum ScheduleItemState {
    NOT_STARTED,
    IN_PROGRESS,
    FINISHED
}
