package dev.gethealthy.app.services;

import dev.gethealthy.app.models.requests.MoveProgramParticipantRequest;
import dev.gethealthy.app.models.responses.ProgramParticipantDetailsResponse;
import dev.gethealthy.app.models.responses.ProgramParticipantResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TraineeOnProgramService {
    Page<ProgramParticipantDetailsResponse> getTrainingProgramParticipants(Integer programId, String filter, Pageable page);
    List<ProgramParticipantResponse> getAllTrainingProgramParticipants(Integer programId);
    void removeTraineeFromTrainingProgram(Integer programId, Integer traineeId);
    void moveTraineeToAnotherTrainingProgram(Integer programId, Integer traineeId, MoveProgramParticipantRequest request);
}
