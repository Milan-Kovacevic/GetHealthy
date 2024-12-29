package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.exceptions.NotFoundException;
import dev.gethealthy.app.models.entities.*;
import dev.gethealthy.app.models.responses.*;
import dev.gethealthy.app.repositories.TraineeOnTrainingProgramRepository;
import dev.gethealthy.app.repositories.TrainingProgramExerciseRepository;
import dev.gethealthy.app.repositories.TrainingProgramRepository;
import dev.gethealthy.app.services.TrainingProgramService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrainingProgramServiceImpl extends CrudJpaService<TrainingProgram, Integer> implements TrainingProgramService {
    private final TrainingProgramRepository trainingProgramRepository;
    private final TrainingProgramExerciseRepository trainingProgramExerciseRepository;
    private final ModelMapper modelMapper;

    public TrainingProgramServiceImpl(TrainingProgramRepository trainingProgramRepository,
                                      TrainingProgramExerciseRepository trainingProgramExerciseRepository,
                                      ModelMapper modelMapper) {
        super(trainingProgramRepository, modelMapper, TrainingProgram.class);
        this.trainingProgramRepository = trainingProgramRepository;
        this.trainingProgramExerciseRepository = trainingProgramExerciseRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public Page<TrainingProgramResponse> getFilteredTrainingPrograms(Specification<TrainingProgram> spec, Sort sort, Pageable page) {
        Pageable pageableWithSort = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);
        var dbResponse = trainingProgramRepository.findAll(spec, pageableWithSort);
        var result = dbResponse.map(e -> modelMapper.map(e, TrainingProgramResponse.class));
        for (int i = 0; i < result.getContent().size(); i++) {
            result.getContent().get(i).setRating(dbResponse.getContent().get(i).getTrainingProgramRatings().stream().mapToDouble(ProgramRating::getRate).average().orElse(0.0));
        }
        return result;
    }

    @Override
    public void delete(Integer id) {
        var trainingProgram = trainingProgramRepository.findById(id).orElse(null);
        if (trainingProgram == null)
            throw new NotFoundException();
        trainingProgram.setDeleted(true);
        trainingProgramRepository.save(trainingProgram);
    }

    @Override
    public List<TrainerProgramResponse> getAllTrainingProgramsForTrainer(Integer userId) {
        return trainingProgramRepository
                .findAllByTrainer_Id(userId)
                .stream()
                .map(e -> modelMapper.map(e, TrainerProgramResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public SingleTrainingProgramResponse getSingleTrainingProgram(Integer programId) {
        TrainingProgram program = trainingProgramRepository.findById(programId)
                .orElseThrow(NotFoundException::new);

        SingleTrainingProgramResponse programResponse = modelMapper.map(program, SingleTrainingProgramResponse.class);

        programResponse.setCurrentlyEnrolled(getTrainingProgramCurrentlyEnrolled(programId));
        programResponse.setTotalRates(getTrainingProgramTotalRates(programId));
        programResponse.setAverageRate(getTrainingProgramAverageRate(programId));

        return programResponse;
    }

    private int getTrainingProgramCurrentlyEnrolled(Integer programId) {
        return trainingProgramRepository.calculateNumberOfTrainingProgramTrainees(programId);
    }

    private int getTrainingProgramTotalRates(Integer programId) {
        return trainingProgramRepository.calculateNumberOfTrainingProgramRatings(programId);
    }

    private Double getTrainingProgramAverageRate(Integer programId) {
        return trainingProgramRepository.calculateTrainingProgramAverageRate(programId).orElse(0.0);
    }

    @Override
    public TrainerResponse getTrainerByProgramId(Integer programId) {
        TrainingProgram trainingProgram = trainingProgramRepository.findById(programId)
                .orElseThrow(NotFoundException::new);

        Trainer trainer = trainingProgram.getTrainer();
        UserAccount userAccount = trainer.getUserAccount();
        TrainerResponse response = modelMapper.map(trainer, TrainerResponse.class);
        response.setEmail(userAccount.getEmail());

        return response;
    }

    public SingleProgramDetailsResponse getTrainingProgramDetails(Integer id) {
        TrainingProgram trainingProgram = trainingProgramRepository.findById(id).orElseThrow(NotFoundException::new);

        var response = modelMapper.map(trainingProgram, SingleProgramDetailsResponse.class);
        var exercises = trainingProgramExerciseRepository
                .findAllByProgram_Id(id)
                .stream()
                .sorted(Comparator.comparingInt(TrainingProgramExercise::getPosition))
                .map(e -> {
                    var respObj = modelMapper.map(e, ProgramExerciseResponse.class);
                    modelMapper.map(e.getExercise(), respObj);
                    modelMapper.map(e.getExerciseSets(), respObj);
                    return respObj;
                })
                .collect(Collectors.toList());
        response.setExercises(exercises);
        return response;
    }

    @Override
    public List<FeaturedProgramResponse> getFeaturedTrainingPrograms() {
        return trainingProgramRepository
                .findTop5ByOrderByCreatedAtDesc()
                .stream()
                .map(e->{
                    var response = modelMapper.map(e, FeaturedProgramResponse.class);
                    response.setParticipants(trainingProgramRepository.calculateNumberOfTrainingProgramTrainees(e.getId()));
                    return response;
                })
                .collect(Collectors.toList());
    }

}
