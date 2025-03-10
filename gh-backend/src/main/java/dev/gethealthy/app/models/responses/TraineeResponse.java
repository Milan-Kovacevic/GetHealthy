package dev.gethealthy.app.models.responses;

import java.math.BigDecimal;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class TraineeResponse extends SingleUserResponse {
    private Integer height;
    private BigDecimal weight;
    private String medicalHistory;
}
