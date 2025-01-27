package dev.gethealthy.app.models.responses;

import dev.gethealthy.app.models.enums.DayOfWeek;
import dev.gethealthy.app.models.enums.ScheduleItemState;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalTime;

@Data
@Getter
@Setter
public class TrainingScheduleResponse {
    private Integer id;
    private LocalTime startTime;
    private DayOfWeek dayOfWeek;
    private TrainingProgramScheduleResponse program;
    private ScheduleItemState scheduleItemState;
}
