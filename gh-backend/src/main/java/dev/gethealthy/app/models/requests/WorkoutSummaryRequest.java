package dev.gethealthy.app.models.requests;

import lombok.*;

@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkoutSummaryRequest {
    private int traineeId;
    private int programScheduleId;
}
