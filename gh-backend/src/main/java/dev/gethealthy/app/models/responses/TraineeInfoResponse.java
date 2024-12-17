package dev.gethealthy.app.models.responses;

import java.math.BigDecimal;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class TraineeInfoResponse extends UserInfoResponse {
    private Integer height;
    private BigDecimal weight;
    private String medicalHistory;
}