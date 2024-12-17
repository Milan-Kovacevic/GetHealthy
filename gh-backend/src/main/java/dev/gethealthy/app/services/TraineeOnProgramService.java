package dev.gethealthy.app.services;

import dev.gethealthy.app.models.requests.MoveProgramParticipantRequest;
import dev.gethealthy.app.models.responses.SingleProgramParticipantResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TraineeOnProgramService {
    Page<SingleProgramParticipantResponse> getTrainingProgramParticipants(Integer programId, String filter, Pageable page);

    void removeTraineeFromTrainingProgram(Integer programId, Integer traineeId);

    void moveTraineeToAnotherTrainingProgram(Integer programId, Integer traineeId, MoveProgramParticipantRequest request);
}
