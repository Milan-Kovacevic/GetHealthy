package dev.gethealthy.app.controllers;

import dev.gethealthy.app.models.requests.ProcessRequest;
import dev.gethealthy.app.models.requests.TrainingProgramApplicationRequest;
import dev.gethealthy.app.models.responses.ProgramApplicationResponse;
import dev.gethealthy.app.models.responses.SingleProgramApplicationResponse;
import dev.gethealthy.app.services.TrainingProgramApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("${gethealthy.base-url}")
public class TrainingProgramApplicationController {

    private final TrainingProgramApplicationService trainingProgramApplicationService;

    @GetMapping("/users/{userId}/applications")
    @ResponseStatus(HttpStatus.OK)
    public Page<ProgramApplicationResponse> getAllApplicationsForTrainer(@RequestParam(name = "filter", required = false, defaultValue = "") String filter,
                                                                         @PathVariable(name = "userId") Integer userId, Pageable page) {
        if ("".equals(filter))
            return trainingProgramApplicationService.getAllApplicationsForTrainer(userId, page);
        else
            return trainingProgramApplicationService.getAllApplicationsForTrainerFiltered(userId, filter, page);
    }

    @GetMapping("/users/{userId}/applications/{programId}")
    @ResponseStatus(HttpStatus.OK)
    public SingleProgramApplicationResponse getProgramApplicationDetails(@PathVariable(name = "userId") Integer userId,
                                                                         @PathVariable(name = "programId") Integer programId) {
       return trainingProgramApplicationService.getProgramApplication(userId, programId);
    }

    @PostMapping("/users/{userId}/applications")
    @ResponseStatus(HttpStatus.CREATED)
    public ProgramApplicationResponse addTrainingProgramApplication(@PathVariable(name = "userId") Integer userId,
                                                                    @RequestBody @Valid TrainingProgramApplicationRequest request) {
        return trainingProgramApplicationService.createTrainingProgramApplication(userId, request);
    }

    @PostMapping("/users/{userId}/applications/{programId}/process")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void processTrainingProgramApplication(@PathVariable Integer userId,
                                                  @PathVariable Integer programId,
                                                  @RequestBody @Valid ProcessRequest request) {
        trainingProgramApplicationService.processTrainingProgramApplication(userId, programId, request);
    }

}
