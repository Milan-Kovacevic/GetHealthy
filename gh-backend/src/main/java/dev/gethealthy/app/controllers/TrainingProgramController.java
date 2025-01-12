package dev.gethealthy.app.controllers;

import dev.gethealthy.app.models.entities.TrainingProgram;
import dev.gethealthy.app.models.requests.CreateTrainingProgramRequest;
import dev.gethealthy.app.models.requests.TrainingProgramExercisesRequest;
import dev.gethealthy.app.models.requests.TrainingProgramRequest;
import dev.gethealthy.app.models.responses.*;
import dev.gethealthy.app.services.TrainingProgramService;
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

import static dev.gethealthy.app.specifications.TrainingProgramSpecification.constructSpecification;

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

    @PostMapping(consumes = "multipart/form-data")
    @ResponseStatus(HttpStatus.CREATED)
    public void createTrainingProgram(
            @RequestPart(name = "training-program") @Valid CreateTrainingProgramRequest trainingProgramRequest,
            @RequestPart(name = "training-program-exercises") @Valid TrainingProgramExercisesRequest trainingProgramExercisesRequest,
            @RequestPart(name = "file", required = false) MultipartFile file,
            Authentication auth) {
        // TODO: Compare userId from auth object and request

        trainingProgramService.createTrainingProgram(trainingProgramRequest, trainingProgramExercisesRequest,
                file);
    }

    @PutMapping(path = "{programId}/info", consumes = "multipart/form-data")
    @ResponseStatus(HttpStatus.OK)
    public void updateTrainingProgramGeneralInfo(@PathVariable Integer programId,
            @RequestPart(name = "training-program") @Valid TrainingProgramRequest trainingProgramRequest,
            @RequestPart(name = "file", required = false) MultipartFile file,
            Authentication auth) {
        trainingProgramService.updateTrainingProgramGeneralInfo(programId, trainingProgramRequest, file);
    }

    @DeleteMapping("{programId}")
    public void removeTrainingProgram(@PathVariable Integer programId) {
        trainingProgramService.deleteTrainingProgram(programId);
    }

    // Program details endpoints

    @GetMapping("{programId}")
    public SingleTrainingProgramResponse getSingleTrainingProgram(@PathVariable Integer programId) {
        return trainingProgramService.getSingleTrainingProgram(programId);
    }

    @GetMapping("{programId}/info")
    public TrainingProgramInfoResponse getTrainingProgramInfo(@PathVariable Integer programId) {
        // TODO: Include joined flag for trainee, based of if he already joined to that program or not
        return trainingProgramService.getTrainingProgramInfo(programId);
    }

    @GetMapping("{programId}/trainer-info")
    public TrainerResponse getTrainerByProgramId(@PathVariable Integer programId) {
        return trainingProgramService.getTrainerByProgramId(programId);
    }

    @GetMapping("{programId}/details")
    public SingleProgramDetailsResponse getTrainingProgramDetails(@PathVariable(name = "programId") Integer programId) {
        return trainingProgramService.getTrainingProgramDetails(programId);
    }

}
