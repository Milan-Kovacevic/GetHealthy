package dev.gethealthy.app.models.requests;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseSetFeedbackRequest {
    private Integer exerciseFeedbackId;
    private Boolean skipped;
    private Boolean completed;
    private String firstMetricValueFeedback;
    private String secondMetricValueFeedback;
}
