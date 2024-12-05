package dev.gethealthy.app.controllers;

import dev.gethealthy.app.base.CrudController;
import dev.gethealthy.app.models.entities.TrainingProgram;
import dev.gethealthy.app.models.requests.TrainingProgramRequest;
import dev.gethealthy.app.models.responses.TrainingProgramResponse;
import dev.gethealthy.app.services.TrainingProgramService;
import dev.gethealthy.app.specifications.TrainingProgramSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("${base-url}/training-programs")
public class TrainingProgramController extends CrudController<Integer, TrainingProgramRequest, TrainingProgramResponse>{
    private final TrainingProgramService trainingProgramService;

    public TrainingProgramController(TrainingProgramService crudService) {
        super(crudService, TrainingProgramResponse.class);
        this.trainingProgramService = crudService;
    }

    @GetMapping
    @RequestMapping("/filter")
    public Page<TrainingProgramResponse> getAll(Pageable page,
                                                @RequestParam(defaultValue = "name") String sortBy,
                                                @RequestParam(defaultValue = "asc") String sortDir,
                                                @RequestParam(required = false) List<String> categories,
                                                @RequestParam(required = false, defaultValue = "5.0") double ratingUpper,
                                                @RequestParam(required = false, defaultValue = "0.0") double ratingLower,
                                                @RequestParam(required = false, defaultValue = "0") long participantsUpper,
                                                @RequestParam(required = false, defaultValue = "1000") long participantsLower,
                                                @RequestParam(required = false, defaultValue = "1") int difficulty) {
        Specification<TrainingProgram> spec = Specification
            .where(TrainingProgramSpecification.hasRatingBetween(ratingLower, ratingUpper))
                .and(TrainingProgramSpecification.hasParticipantCountBetween(participantsLower, participantsUpper));

        Sort sort = Sort.by(Sort.Direction.fromString(sortDir), sortBy);

        return trainingProgramService.findAll(spec, sort, page);

    }
}
