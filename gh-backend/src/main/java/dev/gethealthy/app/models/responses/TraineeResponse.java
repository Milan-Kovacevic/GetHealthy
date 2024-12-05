package dev.gethealthy.app.models.responses;

import dev.gethealthy.app.models.entities.User;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Data
@Setter
@Getter
public class TraineeResponse {
    private Integer id;

    private User user;

    private Integer height;

    private BigDecimal weight;

    private String medicalHistory;
}
