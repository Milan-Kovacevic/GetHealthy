package dev.gethealthy.app.models.requests;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProcessRequest {
    @NotNull
    private Boolean approve;
}
