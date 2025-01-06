package dev.gethealthy.app.controllers;

import dev.gethealthy.app.models.requests.MoveProgramParticipantRequest;
import dev.gethealthy.app.models.responses.ProgramParticipantDetailsResponse;
import dev.gethealthy.app.models.responses.ProgramParticipantResponse;
import dev.gethealthy.app.services.TraineeOnProgramService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${gethealthy.base-url}/training-programs")
@RequiredArgsConstructor
public class TraineeOnProgramController {
    private final TraineeOnProgramService traineeOnProgramService;

    @GetMapping("/{programId}/participants")
    @ResponseStatus(HttpStatus.OK)
    public Page<ProgramParticipantDetailsResponse> getTrainingProgramParticipants(@PathVariable(name = "programId") Integer programId,
                                                                                  @RequestParam(defaultValue = "") String filter,
                                                                                  Pageable page) {
        return traineeOnProgramService.getTrainingProgramParticipants(programId, filter, page);
    }

    @GetMapping("/{programId}/participants/all")
    @ResponseStatus(HttpStatus.OK)
    public List<ProgramParticipantResponse> getAllTrainingProgramParticipants(@PathVariable(name = "programId") Integer programId) {
        return traineeOnProgramService.getAllTrainingProgramParticipants(programId);
    }

    @DeleteMapping("/{programId}/participants/{traineeId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeTraineeFromTrainingProgram(@PathVariable(name = "programId") Integer programId,
                                                 @PathVariable(name = "traineeId") Integer traineeId){
        traineeOnProgramService.removeTraineeFromTrainingProgram(programId, traineeId);
    }

    @PutMapping("/{programId}/participants/{traineeId}/move")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void moveTraineeToAnotherTrainingProgram(@PathVariable(name = "programId") Integer programId,
                                                    @PathVariable(name = "traineeId") Integer traineeId,
                                                    @RequestBody MoveProgramParticipantRequest request){
        traineeOnProgramService.moveTraineeToAnotherTrainingProgram(programId, traineeId, request);
    }
}
