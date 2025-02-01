package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.exceptions.BadRequestException;
import dev.gethealthy.app.exceptions.NotFoundException;
import dev.gethealthy.app.models.entities.TraineeOnTrainingProgram;
import dev.gethealthy.app.models.entities.TraineeOnTrainingProgramId;
import dev.gethealthy.app.models.enums.NotificationType;
import dev.gethealthy.app.models.requests.MoveProgramParticipantRequest;
import dev.gethealthy.app.models.responses.ProgramParticipantDetailsResponse;
import dev.gethealthy.app.models.responses.ProgramParticipantResponse;
import dev.gethealthy.app.repositories.TraineeOnTrainingProgramRepository;
import dev.gethealthy.app.repositories.TrainingProgramRepository;
import dev.gethealthy.app.services.NotificationService;
import dev.gethealthy.app.services.TraineeOnProgramService;
import dev.gethealthy.app.util.Utility;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class TraineeOnProgramServiceImpl implements TraineeOnProgramService {
    private final TraineeOnTrainingProgramRepository traineeOnTrainingProgramRepository;
    private final TrainingProgramRepository trainingProgramRepository;
    private final NotificationService notificationService;
    private final ModelMapper modelMapper;

    @Override
    public Page<ProgramParticipantDetailsResponse> getTrainingProgramParticipants(Integer programId, String filter, Pageable page) {
        var programParticipants = traineeOnTrainingProgramRepository.getAllTraineesOnTrainingProgramFiltered(programId, filter, page);

        return programParticipants.map(e -> {
            var model = modelMapper.map(e, ProgramParticipantDetailsResponse.class);
            modelMapper.map(e.getUser(), model);
            return model;
        });
    }

    @Override
    public List<ProgramParticipantResponse> getAllTrainingProgramParticipants(Integer programId) {
        return traineeOnTrainingProgramRepository
                .findAllByProgram_Id(programId)
                .stream()
                .map(e -> {
                    var model = modelMapper.map(e, ProgramParticipantResponse.class);
                    modelMapper.map(e.getUser(), model);
                    return model;
                })
                .collect(Collectors.toList());
    }

    @Override
    public void removeTraineeFromTrainingProgram(Integer programId, Integer traineeId) {
        var traineeOnProgram = traineeOnTrainingProgramRepository
                .findByProgram_IdAndUser_Id(programId, traineeId)
                .orElseThrow(NotFoundException::new);

        traineeOnTrainingProgramRepository.deleteByProgram_IdAndUser_Id(programId, traineeId);
        notificationService.createNotification(
                traineeOnProgram.getUser(),
                traineeOnProgram.getProgram().getTrainer(),
                traineeOnProgram.getProgram().getName(),
                NotificationType.TRAINEE_REMOVED_FROM_PROGRAM
        );
    }

    @Override
    public void moveTraineeToAnotherTrainingProgram(Integer programId, Integer traineeId, MoveProgramParticipantRequest request) {
        var traineeOnProgram = traineeOnTrainingProgramRepository.findByProgram_IdAndUser_Id(programId, traineeId).orElseThrow(NotFoundException::new);
        var programTrainer = traineeOnProgram.getProgram().getTrainer();
        var trainerId = programTrainer.getId();

        var oldTrainingProgram = traineeOnProgram.getProgram();
        var newTrainingProgram = trainingProgramRepository
                .findById(request.getNewProgramId())
                .orElseThrow(NotFoundException::new);

        // Check to see if the new program belongs to the same trainer ...
        if (!Objects.equals(request.getTrainerId(), trainerId)
                || !Objects.equals(newTrainingProgram.getTrainer().getId(), trainerId))
            throw new BadRequestException("Training program not owned by the same trainer");

        TraineeOnTrainingProgram entity = new TraineeOnTrainingProgram();
        entity.setId(new TraineeOnTrainingProgramId(traineeId, request.getNewProgramId()));
        entity.setUser(traineeOnProgram.getUser());
        entity.setProgram(newTrainingProgram);
        entity.setJoinDate(Utility.getInstantCurrentDate());
        traineeOnTrainingProgramRepository.delete(traineeOnProgram);
        traineeOnTrainingProgramRepository.saveAndFlush(entity);

        notificationService.createNotification(
                entity.getUser(),
                programTrainer,
                oldTrainingProgram.getName() + "$" + newTrainingProgram.getName(),
                NotificationType.TRAINEE_MOVED_TO_ANOTHER_PROGRAM
        );
    }
}
