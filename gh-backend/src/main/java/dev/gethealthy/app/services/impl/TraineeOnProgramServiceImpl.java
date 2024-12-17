package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.exceptions.BadRequestException;
import dev.gethealthy.app.exceptions.NotFoundException;
import dev.gethealthy.app.models.entities.TraineeOnTrainingProgram;
import dev.gethealthy.app.models.entities.TraineeOnTrainingProgramId;
import dev.gethealthy.app.models.requests.MoveProgramParticipantRequest;
import dev.gethealthy.app.models.responses.SingleProgramParticipantResponse;
import dev.gethealthy.app.repositories.TraineeOnTrainingProgramRepository;
import dev.gethealthy.app.repositories.TrainingProgramRepository;
import dev.gethealthy.app.services.TraineeOnProgramService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TraineeOnProgramServiceImpl implements TraineeOnProgramService {
    private final TraineeOnTrainingProgramRepository traineeOnTrainingProgramRepository;
    private final TrainingProgramRepository trainingProgramRepository;
    private final ModelMapper modelMapper;

    @Override
    public Page<SingleProgramParticipantResponse> getTrainingProgramParticipants(Integer programId, String filter, Pageable page) {
        var programParticipants = traineeOnTrainingProgramRepository.getAllTraineesOnTrainingProgramFiltered(programId, filter, page);

        return programParticipants.map(e -> {
            var model = modelMapper.map(e, SingleProgramParticipantResponse.class);
            modelMapper.map(e.getUser(), model);
            modelMapper.map(e.getUser().getUser(), model);
            return model;
        });
    }

    @Override
    public void removeTraineeFromTrainingProgram(Integer programId, Integer traineeId) {
        var exists = traineeOnTrainingProgramRepository.existsByProgram_IdAndUser_Id(programId, traineeId);
        if (!exists)
            throw new NotFoundException();
        traineeOnTrainingProgramRepository.deleteById(new TraineeOnTrainingProgramId(traineeId, programId));
    }

    @Override
    public void moveTraineeToAnotherTrainingProgram(Integer programId, Integer traineeId, MoveProgramParticipantRequest request) {
        var traineeOnProgram = traineeOnTrainingProgramRepository.findByProgram_IdAndUser_Id(programId, traineeId).orElseThrow(NotFoundException::new);
        var programTrainer = traineeOnProgram.getProgram().getTrainer();
        var trainerId = programTrainer.getId();

        var newTrainingProgram = trainingProgramRepository.findById(request.getNewProgramId()).orElseThrow(NotFoundException::new);

        // Check to see if the new program belongs to the same trainer ...
        if(!Objects.equals(request.getTrainerId(), trainerId)
                || !Objects.equals(newTrainingProgram.getTrainer().getId(), trainerId))
            throw new BadRequestException("Training program not owned by the same trainer");

        TraineeOnTrainingProgram entity = new TraineeOnTrainingProgram();
        entity.setId(new TraineeOnTrainingProgramId(traineeId, request.getNewProgramId()));
        entity.setUser(traineeOnProgram.getUser());
        entity.setProgram(newTrainingProgram);
        entity.setJoinDate(Instant.now());
        traineeOnTrainingProgramRepository.saveAndFlush(entity);
    }
}
