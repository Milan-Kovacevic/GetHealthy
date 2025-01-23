package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.exceptions.BadRequestException;
import dev.gethealthy.app.exceptions.ConflictException;
import dev.gethealthy.app.exceptions.NotFoundException;
import dev.gethealthy.app.models.entities.*;
import dev.gethealthy.app.models.enums.NotificationType;
import dev.gethealthy.app.models.requests.TrainingProgramApplicationProcessRequest;
import dev.gethealthy.app.models.requests.TrainingProgramApplicationRequest;
import dev.gethealthy.app.models.responses.SingleProgramApplicationResponse;
import dev.gethealthy.app.models.responses.ProgramApplicationResponse;
import dev.gethealthy.app.repositories.TraineeOnTrainingProgramRepository;
import dev.gethealthy.app.repositories.TraineeRepository;
import dev.gethealthy.app.repositories.TrainingProgramApplicationRepository;
import dev.gethealthy.app.repositories.TrainingProgramRepository;
import dev.gethealthy.app.services.NotificationService;
import dev.gethealthy.app.services.TrainingProgramApplicationService;
import dev.gethealthy.app.util.Utility;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class TrainingProgramApplicationServiceImpl implements TrainingProgramApplicationService {
    private final TrainingProgramApplicationRepository trainingProgramApplicationRepository;
    private final TraineeOnTrainingProgramRepository traineeOnTrainingProgramRepository;
    private final TrainingProgramRepository trainingProgramRepository;
    private final TraineeRepository traineeRepository;
    private final NotificationService notificationService;
    private final ModelMapper modelMapper;

    @Override
    public Page<ProgramApplicationResponse> getAllApplicationsForTrainer(Integer trainerId, Pageable page) {
        return trainingProgramApplicationRepository
                .findByProgram_Trainer_IdOrderByMarkReadAsc(trainerId, page)
                .map(e -> modelMapper.map(e, ProgramApplicationResponse.class));
    }

    @Override
    public Page<ProgramApplicationResponse> getAllApplicationsForTrainerFiltered(Integer userId, String filter,
                                                                                 Pageable page) {
        return trainingProgramApplicationRepository
                .findAllTrainerApplicationsFiltered(userId, filter, page)
                .map(e -> modelMapper.map(e, ProgramApplicationResponse.class));
    }

    @Override
    public SingleProgramApplicationResponse getProgramApplication(Integer traineeId, Integer programId) {
        TrainingProgramApplication entity = trainingProgramApplicationRepository
                .findByProgram_IdAndTrainee_Id(programId, traineeId)
                .orElseThrow(NotFoundException::new);

        return modelMapper.map(entity, SingleProgramApplicationResponse.class);
    }

    @Override
    public ProgramApplicationResponse createTrainingProgramApplication(Integer traineeId,
            TrainingProgramApplicationRequest request) {
        if (trainingProgramApplicationRepository.existsByProgram_IdAndTrainee_Id(request.getProgramId(), traineeId))
            throw new ConflictException();

        TrainingProgramApplication entity = modelMapper.map(request, TrainingProgramApplication.class);
        entity.setMarkRead(false);
        entity.setSubmissionDate(Utility.getInstantCurrentDate());
        TrainingProgram trainingProgram = trainingProgramRepository.findById(request.getProgramId())
                .orElseThrow(NotFoundException::new);
        Trainee trainee = traineeRepository.findById(traineeId).orElseThrow(NotFoundException::new);

        entity.setProgram(trainingProgram);
        entity.setTrainee(trainee);
        trainingProgramApplicationRepository.saveAndFlush(entity);

        return modelMapper.map(entity, ProgramApplicationResponse.class);
    }

    @Override
    public void processTrainingProgramApplication(Integer traineeId, Integer programId,
            TrainingProgramApplicationProcessRequest request) {
        TrainingProgramApplication application = trainingProgramApplicationRepository
                .findByProgram_IdAndTrainee_Id(programId, traineeId)
                .orElseThrow(NotFoundException::new);

        if (request.getApprove()) {
            TraineeOnTrainingProgram entity = new TraineeOnTrainingProgram();
            entity.setJoinDate(Utility.getInstantCurrentDate());
            entity.setProgram(application.getProgram());
            entity.setUser(application.getTrainee());
            traineeOnTrainingProgramRepository.saveAndFlush(entity);

            notificationService.createNotification(
                    application.getTrainee(),
                    application.getProgram().getTrainer(),
                    application.getProgram().getName(),
                    NotificationType.PROGRAM_APPLICATION_ACCEPTED);
        } else {
            notificationService.createNotification(
                    application.getTrainee(),
                    application.getProgram().getTrainer(),
                    application.getProgram().getName(),
                    NotificationType.PROGRAM_APPLICATION_REJECTED);
        }
        trainingProgramApplicationRepository.deleteByProgram_IdAndTrainee_Id(programId, traineeId);
    }

    @Override
    public void markTrainingProgramApplicationAsRead(TrainingProgramApplicationId id) {
        TrainingProgramApplication application = trainingProgramApplicationRepository
                .findById(id)
                .orElseThrow(NotFoundException::new);
        application.setMarkRead(true);
        trainingProgramApplicationRepository.saveAndFlush(application);
    }

}
