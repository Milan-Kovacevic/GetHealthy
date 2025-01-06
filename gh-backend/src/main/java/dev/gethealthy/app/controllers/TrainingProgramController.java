package dev.gethealthy.app.controllers;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import dev.gethealthy.app.models.entities.TrainingProgram;
import dev.gethealthy.app.models.requests.TrainingProgramExercisesRequest;
import dev.gethealthy.app.models.requests.TrainingProgramRequest;
import dev.gethealthy.app.models.responses.FeaturedProgramResponse;
import dev.gethealthy.app.models.responses.SingleProgramDetailsResponse;
import dev.gethealthy.app.models.responses.SingleTrainingProgramResponse;
import dev.gethealthy.app.models.responses.TrainerResponse;
import dev.gethealthy.app.models.responses.TrainingProgramResponse;
import dev.gethealthy.app.services.TrainingProgramService;
import dev.gethealthy.app.specifications.TrainingProgramSpecification;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("${gethealthy.base-url}/training-programs")
@RequiredArgsConstructor
public class TrainingProgramController {
    private final TrainingProgramService trainingProgramService;

    @GetMapping
    public Page<TrainingProgramResponse> getPageableTrainingPrograms(Pageable page,
            @RequestParam(defaultValue = "") String searchWord,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir,
            @RequestParam(required = false) List<String> categories,
            @RequestParam(required = false, defaultValue = "5.0") double ratingUpper,
            @RequestParam(required = false, defaultValue = "0.0") double ratingLower,
            @RequestParam(required = false, defaultValue = "1000") long participantsUpper,
            @RequestParam(required = false, defaultValue = "0") long participantsLower,
            @RequestParam(required = false, defaultValue = "0") int difficulty) {
        Specification<TrainingProgram> spec = constructSpecification(searchWord, categories, ratingUpper,
                ratingLower, participantsUpper, participantsLower, difficulty);

        Sort sort = Sort.by(Sort.Direction.fromString(sortDir), sortBy);

        return trainingProgramService.getFilteredTrainingPrograms(spec, sort, page);
    }

    @GetMapping("featured")
    public List<FeaturedProgramResponse> getFeaturedTrainingPrograms() {
        return trainingProgramService.getFeaturedTrainingPrograms();
    }

    @PutMapping("{programId}")
    public TrainingProgramResponse updateTrainingProgram(@PathVariable Integer programId,
            @RequestBody TrainingProgramRequest request) {
        return trainingProgramService.update(programId, request, TrainingProgramResponse.class);
    }

    @PostMapping(path = "{userId}", consumes = "multipart/form-data")
    @ResponseStatus(HttpStatus.CREATED)
    public void createTrainingProgram(
            @PathVariable Integer userId,
            @RequestPart(name = "training-program") @Valid TrainingProgramRequest trainingProgramRequest,
            @RequestPart(name = "training-program-exercises") @Valid TrainingProgramExercisesRequest trainingProgramExercisesRequest,
            @RequestPart(name = "file", required = false) MultipartFile file,
            Authentication auth) {
        trainingProgramService.createTrainingProgram(userId, trainingProgramRequest, trainingProgramExercisesRequest,
                file);
    }

    @PutMapping("{programId}/general-info")
    public void updateTrainingProgramGeneralInfo(@PathVariable Integer programId,
            @RequestPart(name = "training-program") @Valid TrainingProgramRequest trainingProgramRequest,
            @RequestPart(name = "file", required = false) MultipartFile file,
            Authentication auth) {
        System.out.println("Endpoint works! GeneralInfo update!");
    }

    @PutMapping("{programId}/exercise-plan")
    public void updateTrainingProgramExercisePlan(@PathVariable Integer programId,
            @RequestBody @Valid TrainingProgramRequest request, Authentication auth) {
        System.out.println("Endpoint works! ExercisePlan update!");
    }

    @DeleteMapping("{programId}")
    public void removeTrainingProgram(@PathVariable Integer programId) {
        trainingProgramService.delete(programId);
    }

    // Program details endpoints

    @GetMapping("{programId}")
    public SingleTrainingProgramResponse getSingleTrainingProgram(@PathVariable Integer programId) {
        return trainingProgramService.getSingleTrainingProgram(programId);
    }

    @GetMapping("{programId}/trainer-info")
    public TrainerResponse getTrainerByProgramId(@PathVariable Integer programId) {
        return trainingProgramService.getTrainerByProgramId(programId);
    }

    @GetMapping("{programId}/details")
    public SingleProgramDetailsResponse getTrainingProgramDetails(@PathVariable(name = "programId") Integer programId) {
        return trainingProgramService.getTrainingProgramDetails(programId);
    }

    private static Specification<TrainingProgram> constructSpecification(String searchWord, List<String> categories,
            double ratingUpper,
            double ratingLower, long participantsUpper, long participantsLower, int difficulty) {
        return Specification
                .where(TrainingProgramSpecification.nameContains(searchWord))
                .and(TrainingProgramSpecification.hasRatingBetween(ratingLower, ratingUpper))
                .and(TrainingProgramSpecification.hasParticipantCountBetween(participantsLower, participantsUpper))
                .and(TrainingProgramSpecification.belongsToCategories(categories))
                .and(TrainingProgramSpecification.hasDifficulty(difficulty))
                .and(TrainingProgramSpecification.isNotDeleted());
    }
}
