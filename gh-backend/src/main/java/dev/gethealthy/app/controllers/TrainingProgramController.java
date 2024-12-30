package dev.gethealthy.app.controllers;

import dev.gethealthy.app.base.CrudController;
import dev.gethealthy.app.models.entities.TrainingProgram;
import dev.gethealthy.app.models.requests.TrainingProgramRequest;
import dev.gethealthy.app.models.responses.*;
import dev.gethealthy.app.services.TrainingProgramService;
import dev.gethealthy.app.specifications.TrainingProgramSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping
    public TrainingProgramResponse createTrainingProgram(@RequestBody TrainingProgramRequest request) {
        return trainingProgramService.insert(request, TrainingProgramResponse.class);
    }

    @PutMapping("{programId}")
    public TrainingProgramResponse updateTrainingProgram(@PathVariable Integer programId, @RequestBody TrainingProgramRequest request) {
        return trainingProgramService.update(programId, request, TrainingProgramResponse.class);
    }

    @DeleteMapping("{programId}")
    public void removeTrainingProgram(@PathVariable Integer programId){
        trainingProgramService.delete(programId);
    }

    @GetMapping("/users/{userId}/training-programs")
    public List<TrainerProgramResponse> getAllTrainingProgramsForTrainer(@PathVariable Integer userId) {
        return trainingProgramService.getAllTrainingProgramsForTrainer(userId);
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

    private static Specification<TrainingProgram> constructSpecification(String searchWord, List<String> categories, double ratingUpper,
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
