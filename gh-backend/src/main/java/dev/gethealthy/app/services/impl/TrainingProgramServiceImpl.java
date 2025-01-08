package dev.gethealthy.app.services.impl;

import java.io.IOException;
import java.time.Instant;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.exceptions.NotFoundException;
import dev.gethealthy.app.models.entities.Category;
import dev.gethealthy.app.models.entities.Exercise;
import dev.gethealthy.app.models.entities.ExerciseSet;
import dev.gethealthy.app.models.entities.ProgramRating;
import dev.gethealthy.app.models.entities.Trainer;
import dev.gethealthy.app.models.entities.TrainingProgram;
import dev.gethealthy.app.models.entities.TrainingProgramExercise;
import dev.gethealthy.app.models.entities.UserAccount;
import dev.gethealthy.app.models.enums.StorageType;
import dev.gethealthy.app.models.requests.ExerciseSetRequest;
import dev.gethealthy.app.models.requests.TrainingProgramExerciseRequest;
import dev.gethealthy.app.models.requests.TrainingProgramExercisesRequest;
import dev.gethealthy.app.models.requests.TrainingProgramRequest;
import dev.gethealthy.app.models.responses.FeaturedProgramResponse;
import dev.gethealthy.app.models.responses.ProgramExerciseDetailsResponse;
import dev.gethealthy.app.models.responses.SingleProgramDetailsResponse;
import dev.gethealthy.app.models.responses.SingleTrainingProgramResponse;
import dev.gethealthy.app.models.responses.TrainerProgramResponse;
import dev.gethealthy.app.models.responses.TrainerResponse;
import dev.gethealthy.app.models.responses.TrainingProgramResponse;
import dev.gethealthy.app.repositories.CategoryRepository;
import dev.gethealthy.app.repositories.ExerciseRepository;
import dev.gethealthy.app.repositories.ExerciseSetRepository;
import dev.gethealthy.app.repositories.TrainerRepository;
import dev.gethealthy.app.repositories.TrainingProgramExerciseRepository;
import dev.gethealthy.app.repositories.TrainingProgramRepository;
import dev.gethealthy.app.services.StorageAccessService;
import dev.gethealthy.app.services.TrainingProgramService;

@Service
public class TrainingProgramServiceImpl extends CrudJpaService<TrainingProgram, Integer>
        implements TrainingProgramService {
    private final TrainingProgramRepository trainingProgramRepository;
    private final TrainingProgramExerciseRepository trainingProgramExerciseRepository;
    private final ExerciseSetRepository exerciseSetRepository;
    private final ModelMapper modelMapper;
    private final TrainerRepository trainerRepository;
    private final StorageAccessService storageAccessService;
    private final CategoryRepository categoryRepository;
    private final ExerciseRepository exerciseRepository;

    public TrainingProgramServiceImpl(TrainingProgramRepository trainingProgramRepository,
            TrainingProgramExerciseRepository trainingProgramExerciseRepository,
            ModelMapper modelMapper, TrainerRepository trainerRepository, ExerciseSetRepository exerciseSetRepository,
            StorageAccessService storageAccessService, CategoryRepository categoryRepository,
            ExerciseRepository exerciseRepository) {
        super(trainingProgramRepository, modelMapper, TrainingProgram.class);
        this.trainingProgramRepository = trainingProgramRepository;
        this.trainingProgramExerciseRepository = trainingProgramExerciseRepository;
        this.modelMapper = modelMapper;
        this.trainerRepository = trainerRepository;
        this.exerciseSetRepository = exerciseSetRepository;
        this.storageAccessService = storageAccessService;
        this.categoryRepository = categoryRepository;
        this.exerciseRepository = exerciseRepository;
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

        TrainingProgram trainingProgram = new TrainingProgram();

        trainingProgram = modelMapper.map(trainingProgramRequest, TrainingProgram.class);

        trainingProgram.setTrainer(trainer);
        trainingProgram.setCreatedAt(Instant.now());
        trainingProgramRepository.saveAndFlush(trainingProgram);

        for (TrainingProgramExerciseRequest exercisesRequest : trainingProgramExercisesRequest.getExercises()) {
            TrainingProgramExercise trainingProgramExercise = modelMapper.map(exercisesRequest,
                    TrainingProgramExercise.class);
            trainingProgramExercise.setProgram(trainingProgram);
            trainingProgramExerciseRepository.saveAndFlush(trainingProgramExercise);

            for (ExerciseSetRequest setRequest : exercisesRequest.getExerciseSets()) {
                ExerciseSet exerciseSet = modelMapper.map(setRequest, ExerciseSet.class);
                exerciseSet.setProgramExercise(trainingProgramExercise);
                exerciseSetRepository.saveAndFlush(exerciseSet);
            }

        }

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

    @Override
    public void updateTrainingProgramExercisePlan(Integer programId,
            TrainingProgramExercisesRequest trainingProgramExercisesRequest) {
        TrainingProgram trainingProgram = trainingProgramRepository.findById(programId)
                .orElseThrow(() -> new NotFoundException("Training program not found: " + programId));

        // TO DO -> update the training program exercise plan

    }
}
