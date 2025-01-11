package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.exceptions.NotFoundException;
import dev.gethealthy.app.models.entities.*;
import dev.gethealthy.app.models.enums.StorageType;
import dev.gethealthy.app.models.requests.ExerciseSetRequest;
import dev.gethealthy.app.models.requests.TrainingProgramExerciseRequest;
import dev.gethealthy.app.models.requests.TrainingProgramExercisesRequest;
import dev.gethealthy.app.models.requests.TrainingProgramRequest;
import dev.gethealthy.app.models.responses.*;
import dev.gethealthy.app.repositories.*;
import dev.gethealthy.app.services.StorageAccessService;
import dev.gethealthy.app.services.TrainingProgramService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrainingProgramServiceImpl extends CrudJpaService<TrainingProgram, Integer>
        implements TrainingProgramService {
    private final TrainingProgramRepository trainingProgramRepository;
    private final TrainingProgramExerciseRepository trainingProgramExerciseRepository;
    private final ModelMapper modelMapper;
    private final TrainerRepository trainerRepository;
    private final StorageAccessService storageAccessService;
    private final CategoryRepository categoryRepository;


    public TrainingProgramServiceImpl(TrainingProgramRepository trainingProgramRepository,
                                      TrainingProgramExerciseRepository trainingProgramExerciseRepository,
                                      ModelMapper modelMapper, TrainerRepository trainerRepository,
                                      StorageAccessService storageAccessService, CategoryRepository categoryRepository) {
        super(trainingProgramRepository, modelMapper, TrainingProgram.class);
        this.trainingProgramRepository = trainingProgramRepository;
        this.trainingProgramExerciseRepository = trainingProgramExerciseRepository;
        this.modelMapper = modelMapper;
        this.trainerRepository = trainerRepository;
        this.storageAccessService = storageAccessService;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Page<TrainingProgramResponse> getFilteredTrainingPrograms(Specification<TrainingProgram> spec, Sort sort,
                                                                     Pageable page) {
        Pageable pageableWithSort = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);
        var dbResponse = trainingProgramRepository.findAll(spec, pageableWithSort);
        var result = dbResponse.map(e -> modelMapper.map(e, TrainingProgramResponse.class));
        for (int i = 0; i < result.getContent().size(); i++) {
            result.getContent().get(i).setRating(dbResponse.getContent().get(i).getTrainingProgramRatings().stream()
                    .mapToDouble(ProgramRating::getRate).average().orElse(0.0));
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
    public Page<ProgramListingResponse> getTrainingProgramsListedForUser(Integer userId, Pageable page) {
        return trainingProgramRepository
                .findAllByTrainer_Id(userId, page)
                .map(trainingProgram -> {
                    ProgramListingResponse response = modelMapper.map(trainingProgram, ProgramListingResponse.class);
                    response.setTrainerName(trainingProgram.getTrainer().getFirstName() + " "
                            + trainingProgram.getTrainer().getLastName());
                    return response;
                });
    }

    @Override
    public SingleTrainingProgramResponse getSingleTrainingProgram(Integer programId) {
        TrainingProgram program = trainingProgramRepository.findById(programId)
                .orElseThrow(NotFoundException::new);

        SingleTrainingProgramResponse programResponse = modelMapper.map(program, SingleTrainingProgramResponse.class);

        programResponse.setCurrentlyEnrolled(getTrainingProgramCurrentlyEnrolled(programId));
        programResponse.setTotalRates(getTrainingProgramTotalRates(programId));
        programResponse.setRating(getTrainingProgramAverageRate(programId));

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
                    var respObj = modelMapper.map(e, ProgramExerciseDetailsResponse.class);
                    respObj.setProgramExerciseId(e.getId());
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
                .map(e -> {
                    var response = modelMapper.map(e, FeaturedProgramResponse.class);
                    response.setParticipants(
                            trainingProgramRepository.calculateNumberOfTrainingProgramTrainees(e.getId()));
                    return response;
                })
                .collect(Collectors.toList());
    }

    @Override
    public void createTrainingProgram(Integer userId, TrainingProgramRequest trainingProgramRequest,
                                      TrainingProgramExercisesRequest trainingProgramExercisesRequest, MultipartFile file) {
        Trainer trainer = trainerRepository.findById(userId).orElseThrow(NotFoundException::new);

        var trainingProgram = modelMapper.map(trainingProgramRequest, TrainingProgram.class);
        trainingProgram.setTrainer(trainer);
        trainingProgram.setCreatedAt(Instant.now());

        List<TrainingProgramExercise> trainingProgramExercises = new ArrayList<>();

        for (TrainingProgramExerciseRequest exercisesRequest : trainingProgramExercisesRequest
                .getTrainingProgramExercises()) {
            TrainingProgramExercise trainingProgramExercise = modelMapper.map(exercisesRequest,
                    TrainingProgramExercise.class);
            trainingProgramExercise.setProgram(trainingProgram);

            List<ExerciseSet> exerciseSets = new ArrayList<>();
            for (ExerciseSetRequest setRequest : exercisesRequest.getExerciseSets()) {
                ExerciseSet exerciseSet = modelMapper.map(setRequest, ExerciseSet.class);
                exerciseSet.setProgramExercise(trainingProgramExercise);
                exerciseSets.add(exerciseSet);
            }

            trainingProgramExercise.setExerciseSets(exerciseSets);

            trainingProgramExercises.add(trainingProgramExercise);
        }

        trainingProgram.setTrainingProgramExercises(trainingProgramExercises);

        saveFile(file, trainingProgram);

        trainingProgramRepository.saveAndFlush(trainingProgram);

    }

    @Override
    public void updateTrainingProgramGeneralInfo(Integer programId, TrainingProgramRequest trainingProgramRequest,
                                                 MultipartFile file) {
        TrainingProgram trainingProgram = trainingProgramRepository.findById(programId)
                .orElseThrow(NotFoundException::new);

        trainingProgram.setName(trainingProgramRequest.getName());
        trainingProgram.setDescription(trainingProgramRequest.getDescription());
        trainingProgram.setRequirements(trainingProgramRequest.getRequirements());
        trainingProgram.setDifficulty(trainingProgramRequest.getDifficulty());
        trainingProgram.setTrainingDuration(trainingProgramRequest.getTrainingDuration());

        if (trainingProgramRequest.getCategories() != null) {
            List<Category> updatedCategories = trainingProgramRequest.getCategories().stream()
                    .map(catReq -> categoryRepository.findById(catReq.getCategoryId())
                            .orElseThrow(() -> new NotFoundException("Category not found: " +
                                    catReq.getCategoryId())))
                    .toList();

            trainingProgram.getCategories().clear();
            trainingProgram.getCategories().addAll(updatedCategories);
        }

        saveFile(file, trainingProgram);

        trainingProgramRepository.saveAndFlush(trainingProgram);
    }

    private void saveFile(MultipartFile file, TrainingProgram trainingProgram) {
        if (file != null) {
            try {
                String savedFileName = storageAccessService.saveToFile(file.getOriginalFilename(), file.getBytes(),
                        StorageType.PICTURE);

                trainingProgram.setImageFilePath(savedFileName);
            } catch (IOException ex) {
                throw new RuntimeException("Error handling file upload", ex);
            }
        }
    }
}
