package dev.gethealthy.app.models.responses;

import lombok.*;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkoutSummaryResponse {
    private int id;
    private int traineeExercisingId;
    private Instant dateTaken;
    private List<WorkoutExercise> programExercises;

    @EqualsAndHashCode(callSuper = true)
    @Getter
    @Setter
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class WorkoutSet extends ExerciseSetResponse
    {
        private int setFeedbackId;
        private String firstMetricValueFeedback;
        private String secondMetricValueFeedback;
        private Boolean skipped;
        private Boolean completed;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Data
    public static class WorkoutExercise
    {
        private int exerciseFeedbackId;
        private List<WorkoutSet> exerciseSetsFeedback;
        private Boolean skipped;
        protected Integer id;
        protected String name;
        protected String description;
        protected String videoLink;
        protected ExerciseMetricResponse firstExerciseMetric;
        protected ExerciseMetricResponse secondExerciseMetric;
    }


}
