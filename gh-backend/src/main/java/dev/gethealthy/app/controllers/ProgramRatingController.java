package dev.gethealthy.app.controllers;

import dev.gethealthy.app.models.requests.ProgramRatingRequest;
import dev.gethealthy.app.models.responses.ProgramRatingResponse;
import dev.gethealthy.app.services.ProgramRatingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("${gethealthy.base-url}")
public class ProgramRatingController  {
    private final ProgramRatingService programRatingService;

    @GetMapping("/training-programs/{programId}/user-ratings/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public ProgramRatingResponse getUserRatingOnTrainingProgram(@PathVariable(name = "programId") Integer programId,
                                                             @PathVariable(name = "userId") Integer userId) {
        return programRatingService.getUserRatingOnTrainingProgram(programId, userId);
    }

    @PostMapping("/training-programs/{programId}/ratings")
    @ResponseStatus(HttpStatus.CREATED)
    public ProgramRatingResponse addUserRatingOnTrainingProgram(@PathVariable(name = "programId") Integer programId,
                                                            @RequestBody @Valid ProgramRatingRequest request) {
        return programRatingService.saveUserRatingOnTrainingProgram(programId, request);
    }
}
