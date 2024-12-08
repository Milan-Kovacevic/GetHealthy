package dev.gethealthy.app.services;

import dev.gethealthy.app.base.CrudService;
import dev.gethealthy.app.models.requests.ProgramRatingRequest;
import dev.gethealthy.app.models.responses.ProgramRatingResponse;
import dev.gethealthy.app.models.responses.UserRatingResponse;

import java.util.List;

public interface ProgramRatingService extends CrudService<Integer> {
    List<ProgramRatingResponse> getAllRatingsForTrainingProgram(Integer programId);

    ProgramRatingResponse saveRatingOnTrainingProgram(Integer programId, ProgramRatingRequest request);

    UserRatingResponse getUserRatingOnTrainingProgram(Integer programId, Integer userId);
}
