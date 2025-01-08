package dev.gethealthy.app.controllers;

import dev.gethealthy.app.models.responses.TrainerProgramResponse;
import dev.gethealthy.app.services.TrainingProgramService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import dev.gethealthy.app.exceptions.BadRequestException;
import dev.gethealthy.app.models.requests.TrainingProgramApplicationRequest;
import dev.gethealthy.app.models.requests.UserUpdateRequest;
import dev.gethealthy.app.models.responses.SingleUserResponse;
import dev.gethealthy.app.models.responses.UserInfoResponse;
import dev.gethealthy.app.services.TrainingProgramApplicationService;
import dev.gethealthy.app.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${gethealthy.base-url}/users")
public class UserController {
    private final UserService userService;
    private final TrainingProgramService trainingProgramService;
    private final TrainingProgramApplicationService trainingProgramApplicationService;

    @GetMapping("/{userId}")
    public SingleUserResponse getUser(@PathVariable(name = "userId") Integer userId, Authentication auth) {
        return userService.getUser(userId);
    }

    @GetMapping("/{userId}/userInfo")
    public UserInfoResponse getUserInfo(@PathVariable(name = "userId") Integer userId, Authentication auth) {
        return userService.getUserInfo(userId);
    }

    @PostMapping(path = "/{userId}/update", consumes = "multipart/form-data")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateUserInfo(
            @PathVariable(name = "userId") Integer userId,
            @RequestPart(name = "request") @Valid UserUpdateRequest request,
            @RequestPart(name = "file", required = false) MultipartFile file,
            Authentication auth) {

        // Pass both the request and file to the service layer
        userService.updateUser(userId, request, file);
    }

    @PostMapping(path = "/{userId}/updateProfilePicture", consumes = "multipart/form-data")
    public String updateProfilePicture(@PathVariable(name = "userId") Integer userId,
            @RequestParam(name = "file", required = true) MultipartFile file) {
        return userService.updateProfilePicture(userId, file);
    }


    @GetMapping("{userId}/training-programs")
    public Page<TrainerProgramResponse> getTrainingProgramsForTrainer(@PathVariable Integer userId, Pageable page) {
        return trainingProgramService.getTrainingProgramsForTrainer(userId, page);
    }

}
