package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.exceptions.NotFoundException;
import dev.gethealthy.app.models.entities.ProgramRating;
import dev.gethealthy.app.models.entities.Trainee;
import dev.gethealthy.app.models.entities.TrainingProgram;
import dev.gethealthy.app.models.requests.ProgramRatingRequest;
import dev.gethealthy.app.models.responses.ProgramRatingResponse;
import dev.gethealthy.app.repositories.ProgramRatingRepository;
import dev.gethealthy.app.repositories.TraineeOnTrainingProgramRepository;
import dev.gethealthy.app.repositories.TraineeRepository;
import dev.gethealthy.app.repositories.TrainingProgramRepository;
import dev.gethealthy.app.services.ProgramRatingService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProgramRatingServiceImpl implements ProgramRatingService {
    private final ProgramRatingRepository programRatingRepository;
    private final TrainingProgramRepository trainingProgramRepository;
    private final TraineeOnTrainingProgramRepository traineeOnTrainingProgramRepository;
    private final TraineeRepository traineeRepository;
    private final ModelMapper modelMapper;

    public ProgramRatingServiceImpl(ProgramRatingRepository programRatingRepository, ModelMapper modelMapper, TrainingProgramRepository trainingProgramRepository, TraineeOnTrainingProgramRepository traineeOnTrainingProgramRepository, TraineeRepository traineeRepository) {
        this.programRatingRepository = programRatingRepository;
        this.trainingProgramRepository = trainingProgramRepository;
        this.traineeOnTrainingProgramRepository = traineeOnTrainingProgramRepository;
        this.traineeRepository = traineeRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ProgramRatingResponse saveUserRatingOnTrainingProgram(Integer programId,  ProgramRatingRequest request) {
        Trainee trainee = traineeRepository.findById(request.getTraineeId()).orElseThrow(NotFoundException::new);
        TrainingProgram trainingProgram = trainingProgramRepository.findById(programId).orElseThrow(NotFoundException::new);

        if (!traineeOnTrainingProgramRepository
                .existsByProgram_IdAndUser_Id(trainingProgram.getId(), trainee.getId())) {
            throw new NotFoundException();
        }

        Optional<ProgramRating> previousRating = programRatingRepository
                .findByProgram_IdAndUser_Id(programId, request.getTraineeId());

        previousRating.ifPresent(programRating -> {
                    programRatingRepository.deleteById(programRating.getId());
                    programRatingRepository.flush();
                }
        );

        ProgramRating entity = modelMapper.map(request, ProgramRating.class);
        entity.setUser(trainee);
        entity.setProgram(trainingProgram);
        entity.setId(null);
        programRatingRepository.saveAndFlush(entity);

        ProgramRatingResponse rating = modelMapper.map(entity, ProgramRatingResponse.class);
        rating.setTraineeId(trainee.getId());
        return rating;
    }

    @Override
    public ProgramRatingResponse getUserRatingOnTrainingProgram(Integer programId, Integer userId) {
        Optional<ProgramRating> programRating = programRatingRepository
                .findByProgram_IdAndUser_Id(programId, userId);
        ProgramRatingResponse rating = new ProgramRatingResponse();
        if (programRating.isPresent()) {
            rating = modelMapper.map(programRating.get(), ProgramRatingResponse.class);
        }
        return rating;
    }
}
