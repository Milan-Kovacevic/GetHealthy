package dev.gethealthy.app.models.requests;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class MetricsRequest {

    private String name;

    private String unit;
}
