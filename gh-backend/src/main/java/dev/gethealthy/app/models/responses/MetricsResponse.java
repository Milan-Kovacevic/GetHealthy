package dev.gethealthy.app.models.responses;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class MetricsResponse {
    private Integer id;

    private String name;

    private String unit;
}
