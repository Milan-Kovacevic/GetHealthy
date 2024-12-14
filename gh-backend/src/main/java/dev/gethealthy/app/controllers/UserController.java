package dev.gethealthy.app.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dev.gethealthy.app.exceptions.BadRequestException;
import dev.gethealthy.app.models.requests.TraineeRequest;
import dev.gethealthy.app.models.requests.TrainerRequest;
import dev.gethealthy.app.models.requests.TrainingProgramApplicationRequest;
import dev.gethealthy.app.models.responses.TraineeResponse;
import dev.gethealthy.app.models.responses.TrainerResponse;
import dev.gethealthy.app.services.TrainingProgramApplicationService;
import dev.gethealthy.app.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequiredArgsConstructor
@RequestMapping("${gethealthy.base-url}/users")
public class UserController {
    private final UserService userService;
    private final TrainingProgramApplicationService trainingProgramApplicationService;

    @GetMapping("/{trainerId}/trainer")
    @ResponseStatus(HttpStatus.OK)
    public TrainerResponse getTrainer(@PathVariable("trainerId") Integer trainerId, Authentication auth) {

        return userService.getTrainer(trainerId);
    }

    @GetMapping("/{traineeId}/trainee")
    @ResponseStatus(HttpStatus.OK)
    public TraineeResponse getTrainee(@PathVariable("traineeId") Integer traineeId, Authentication auth) {

        return userService.getTrainee(traineeId);
    }

    @PutMapping("/{trainerId}/update-trainer")
    @ResponseStatus(HttpStatus.OK)
    public void updateTrainer(@RequestBody @Valid TrainerRequest request, Authentication auth) {

        userService.updateTrainer(request);
    }

    @PutMapping("/{trainerId}/update-trainee")
    @ResponseStatus(HttpStatus.OK)
    public void updateTrainee(@RequestBody @Valid TraineeRequest request, Authentication auth) {

        userService.updateTrainee(request);
    }

    @PostMapping("/join-program")
    @ResponseStatus(HttpStatus.CREATED)
    public void joinProgram(@RequestBody @Valid TrainingProgramApplicationRequest request) {
        if (request != null)
            trainingProgramApplicationService.joinProgram(request);
        else
            throw new BadRequestException();
    }

}
