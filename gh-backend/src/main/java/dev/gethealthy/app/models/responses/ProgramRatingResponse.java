package dev.gethealthy.app.models.responses;

import lombok.Data;

@Data
public class ProgramRatingResponse {
    private Integer ratingId;
    private Integer rate;
    private Integer traineeId;
}
