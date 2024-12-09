package dev.gethealthy.app.models.requests;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class TraineeRequest {
    private Integer id;

    private UserRequest user;

    private Integer height;

    private BigDecimal weight;

    private String medicalHistory;
}
