package dev.gethealthy.app.controllers;

import dev.gethealthy.app.exceptions.UnauthorizedException;
import dev.gethealthy.app.models.entities.TrainingProgram;
import dev.gethealthy.app.models.enums.Role;
import dev.gethealthy.app.models.requests.UserUpdateRequest;
import dev.gethealthy.app.models.responses.*;
import dev.gethealthy.app.security.models.JwtUser;
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
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static dev.gethealthy.app.specifications.TrainingProgramSpecification.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("${gethealthy.base-url}/users")
public class UserController {
    private final UserService userService;
    private final TrainingProgramService trainingProgramService;

    @GetMapping
    public Page<UserDetailsResponse> getUsers(Pageable page) {
        return userService.getAllUsers(page);
    }

    @GetMapping("/{userId}")
    public UserDetailsResponse getUser(@PathVariable(name = "userId") Integer userId, Authentication auth) {
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
                                                                            @PathVariable(name = "userId") Integer userId, Authentication auth) {
        Specification<TrainingProgram> spec;

        JwtUser user = (JwtUser) auth.getPrincipal();
        Role role = user.getRole();

        if (role == Role.TRAINER)
            spec = constructSpecificationForTrainer(userId, searchWord, categories, ratingUpper,
                ratingLower, participantsUpper, participantsLower, difficulty);
        else if (role == Role.TRAINEE)
            spec = constructSpecificationForTrainee(userId, searchWord, categories, ratingUpper,
                ratingLower, participantsUpper, participantsLower, difficulty);
        else
            throw new UnauthorizedException();
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
