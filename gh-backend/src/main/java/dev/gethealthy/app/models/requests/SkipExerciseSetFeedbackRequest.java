package dev.gethealthy.app.models.requests;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class SkipExerciseSetFeedbackRequest {
    private int exerciseSetId;
}
