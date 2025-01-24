package dev.gethealthy.app.controllers;

import dev.gethealthy.app.exceptions.ForbiddenException;
import dev.gethealthy.app.models.entities.TrainingProgram;
import dev.gethealthy.app.models.enums.Role;
import dev.gethealthy.app.models.requests.UserUpdateRequest;
import dev.gethealthy.app.models.responses.SingleUserResponse;
import dev.gethealthy.app.models.responses.ProgramListingResponse;
import dev.gethealthy.app.models.responses.TrainingProgramResponse;
import dev.gethealthy.app.models.responses.UserInfoResponse;
import dev.gethealthy.app.services.TrainingProgramService;
import dev.gethealthy.app.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static dev.gethealthy.app.specifications.TrainingProgramSpecification.*;
import static dev.gethealthy.app.util.Utility.getJwtUser;

@RestController
@RequiredArgsConstructor
@RequestMapping("${gethealthy.base-url}/users")
public class UserController {
    private final UserService userService;
    private final TrainingProgramService trainingProgramService;

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

    @GetMapping("/{userId}/training-programs")
    public Page<TrainingProgramResponse> getPageableTrainingProgramsForTrainer(Pageable page,
                                                                            @RequestParam(defaultValue = "") String searchWord,
                                                                            @RequestParam(defaultValue = "name") String sortBy,
                                                                            @RequestParam(defaultValue = "asc") String sortDir,
                                                                            @RequestParam(required = false) List<String> categories,
                                                                            @RequestParam(required = false, defaultValue = "5.0") double ratingUpper,
                                                                            @RequestParam(required = false, defaultValue = "0.0") double ratingLower,
                                                                            @RequestParam(required = false, defaultValue = "1000") long participantsUpper,
                                                                            @RequestParam(required = false, defaultValue = "0") long participantsLower,
                                                                            @RequestParam(required = false, defaultValue = "0") int difficulty,
                                                                            @PathVariable(name = "userId") Integer userId) {
        var user = getJwtUser().orElseThrow(ForbiddenException::new);
        Specification<TrainingProgram> spec;
        if(user.getRole() == Role.TRAINER)
            spec = constructSpecificationForTrainer(userId, searchWord, categories, ratingUpper,
                ratingLower, participantsUpper, participantsLower, difficulty);
        else spec = constructSpecificationForTrainee(userId, searchWord, categories, ratingUpper,
                ratingLower, participantsUpper, participantsLower, difficulty);

        Sort sort = Sort.by(Sort.Direction.fromString(sortDir), sortBy);
        return trainingProgramService.getFilteredTrainingPrograms(spec, sort, page);
    }

    @GetMapping("{userId}/training-programs/brief")
    public Page<ProgramListingResponse> getTrainingProgramsListedForUser(@PathVariable Integer userId, Pageable page) {
        return trainingProgramService.getTrainingProgramsListedForUser(userId, page);
    }

    @PostMapping("{userId}/training-programs/{programId}/leave")
    public void leaveTrainingProgram(@PathVariable(name = "userId") Integer userId,
                                     @PathVariable(name = "programId") Integer programId) {
        userService.leaveTrainingProgram(userId, programId);
    }

}
