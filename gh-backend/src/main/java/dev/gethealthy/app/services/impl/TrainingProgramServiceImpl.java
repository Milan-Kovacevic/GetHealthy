package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.exceptions.NotFoundException;
import dev.gethealthy.app.models.entities.ProgramRating;
import dev.gethealthy.app.models.entities.Trainer;
import dev.gethealthy.app.models.entities.TrainingProgram;
import dev.gethealthy.app.models.entities.UserAccount;
import dev.gethealthy.app.models.responses.*;
import dev.gethealthy.app.repositories.RatingRepository;
import dev.gethealthy.app.repositories.TrainingProgramRepository;
import dev.gethealthy.app.services.TrainingProgramService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrainingProgramServiceImpl extends CrudJpaService<TrainingProgram, Integer> implements TrainingProgramService {
    private final TrainingProgramRepository trainingProgramRepository;
    private final ModelMapper modelMapper;

    public TrainingProgramServiceImpl(TrainingProgramRepository repository, RatingRepository ratingRepository , ModelMapper modelMapper) {
        super(repository, modelMapper, TrainingProgram.class);
        trainingProgramRepository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public Page<TrainingProgramResponse> findAll(Specification<TrainingProgram> spec, Sort sort, Pageable page) {
        Pageable pageableWithSort = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);
        var dbResponse = trainingProgramRepository.findAll(spec, pageableWithSort);
        var result = dbResponse.map(e -> modelMapper.map(e, TrainingProgramResponse.class));
        for(int i=0;i< result.getContent().size();i++)
        {
            result.getContent().get(i).setRating(dbResponse.getContent().get(i).getTrainingProgramRatings().stream().mapToDouble(ProgramRating::getRate).average().orElse(0.0));
        }
        return result;
    }

    @Override
    public void delete(Integer id)
    {
        var trainingProgram = trainingProgramRepository.findById(id).orElse(null);
        if (trainingProgram == null)
            throw new NotFoundException();
        trainingProgram.setDeleted(true);
        trainingProgramRepository.save(trainingProgram);
    }

    @Override
    public SingleTrainingProgramResponse getSingleTrainingProgram(Integer programId) {
        TrainingProgram program = trainingProgramRepository.findById(programId)
                .orElseThrow(NotFoundException::new);

        SingleTrainingProgramResponse programResponse = modelMapper.map(program, SingleTrainingProgramResponse.class);

        programResponse.setCurrentlyEnrolled(getTrainingProgramCurrentlyEnrolled(programId));
        programResponse.setTotalRates(getTrainingProgramTotalRates(programId));
        programResponse.setAverageRate(getTrainingProgramAverageRate(programId));

        /*List<TrainingProgramCategoryResponse> categoryResponses = program.getCategories().stream()
                .map(trainingProgramCategory -> {
                    TrainingProgramCategoryResponse response = new TrainingProgramCategoryResponse();
                    CategoryResponse categoryResponse = new CategoryResponse();
                    categoryResponse.setId(trainingProgramCategory.getCategory().getId());
                    categoryResponse.setCategoryName(trainingProgramCategory.getCategory().getName());
                    response.setCategory(categoryResponse);
                    return response;
                })
                .collect(Collectors.toList());

        programResponse.setCategories(categoryResponses);*/

        return programResponse;
    }

    private int getTrainingProgramCurrentlyEnrolled(Integer programId) {
        return trainingProgramRepository.calculateNumberOfTrainingProgramTrainees(programId);
    }

    private int getTrainingProgramTotalRates(Integer programId) {
        return trainingProgramRepository.calculateNumberOfTrainingProgramRatings(programId);
    }

    private Double getTrainingProgramAverageRate(Integer programId) {
        return trainingProgramRepository.calculateTrainingProgramAverageRate(programId);
    }

    @Override
    public TrainerResponse getTrainerByProgramId(Integer programId) {
        TrainingProgram trainingProgram = trainingProgramRepository.findById(programId)
                .orElseThrow(NotFoundException::new);

        Trainer trainer = trainingProgram.getTrainer();
        UserAccount userAccount=trainer.getUserAccount();
        if (trainer == null) {
            throw new NotFoundException();
        }
        TrainerResponse response=modelMapper.map(trainer, TrainerResponse.class);
        response.setEmail(userAccount.getEmail());
        return response;
    }
}
