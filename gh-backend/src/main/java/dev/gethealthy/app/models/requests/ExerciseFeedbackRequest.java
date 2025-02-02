package dev.gethealthy.app.models.requests;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseFeedbackRequest {
    private Integer programExerciseId;
}
