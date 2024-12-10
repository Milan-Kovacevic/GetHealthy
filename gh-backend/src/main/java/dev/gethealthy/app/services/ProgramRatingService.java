package dev.gethealthy.app.services;

import dev.gethealthy.app.models.requests.ProgramRatingRequest;
import dev.gethealthy.app.models.responses.ProgramRatingResponse;

public interface ProgramRatingService {

    ProgramRatingResponse saveUserRatingOnTrainingProgram(Integer programId, ProgramRatingRequest request);

    ProgramRatingResponse getUserRatingOnTrainingProgram(Integer programId, Integer userId);
}
