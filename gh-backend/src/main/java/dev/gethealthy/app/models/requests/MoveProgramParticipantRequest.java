package dev.gethealthy.app.models.requests;

import lombok.Data;

@Data
public class MoveProgramParticipantRequest {
    private Integer newProgramId;
    private Integer trainerId;
}
