package dev.gethealthy.app.models.responses;

import lombok.Data;

@Data
public class UserRatingResponse {
    private Integer ratingId;
    private Integer rate;
}
