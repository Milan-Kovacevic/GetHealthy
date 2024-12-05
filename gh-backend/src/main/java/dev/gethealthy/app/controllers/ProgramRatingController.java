package dev.gethealthy.app.controllers;

import dev.gethealthy.app.base.CrudController;
import dev.gethealthy.app.exceptions.UnauthorizedException;
import dev.gethealthy.app.models.requests.ProgramRatingRequest;
import dev.gethealthy.app.models.responses.ProgramRatingResponse;
import dev.gethealthy.app.models.responses.UserRatingResponse;
import dev.gethealthy.app.services.ProgramRatingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${gethealthy.base-url}")
public class ProgramRatingController  {
    private final ProgramRatingService programRatingService;

    @GetMapping("/training-programs/{programId}/ratings")
    @ResponseStatus(HttpStatus.OK)
    List<ProgramRatingResponse> getAllForTrainingProgram(@PathVariable(name = "programId") Integer id) {
        return programRatingService.getAllRatingsForTrainingProgram(id);
    }

    @GetMapping("/training-programs/{programId}/user-ratings/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public UserRatingResponse getUserRatingOnTrainingProgram(@PathVariable(name = "programId") Integer programId,
                                                             @PathVariable(name = "userId") Integer userId, Authentication auth) {
        if (auth == null)
            throw new UnauthorizedException();
//        JWTUser jwtUser = (JWTUser) auth.getPrincipal();
//        if (!jwtUser.getUserId().equals(userId))
//            throw new ForbiddenException();
        return programRatingService.getUserRatingOnTrainingProgram(programId, userId);
    }

    @PostMapping("/training-programs/{programId}/ratings")
    @ResponseStatus(HttpStatus.CREATED)
    public ProgramRatingResponse addRatingOnTrainingProgram(@PathVariable(name = "programId") Integer id,
                                                            @RequestBody @Valid ProgramRatingRequest request, Authentication auth) {
        if (auth == null)
            throw new UnauthorizedException();
        /*JWTUser jwtUser = (JWTUser) auth.getPrincipal();
        if (!jwtUser.getUserId().equals(request.getTraineeId()))
            throw new ForbiddenException();*/
        return programRatingService.saveRatingOnTrainingProgram(id, request);
    }
}
