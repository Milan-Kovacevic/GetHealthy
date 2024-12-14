package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.exceptions.BadRequestException;
import dev.gethealthy.app.exceptions.ConflictException;
import dev.gethealthy.app.exceptions.NotFoundException;
import dev.gethealthy.app.models.entities.*;
import dev.gethealthy.app.models.enums.NotificationType;
import dev.gethealthy.app.models.requests.TrainingProgramApplicationProcessRequest;
import dev.gethealthy.app.models.requests.TrainingProgramApplicationRequest;
import dev.gethealthy.app.models.responses.SingleTrainingProgramApplicationResponse;
import dev.gethealthy.app.models.responses.TrainingProgramApplicationResponse;
import dev.gethealthy.app.repositories.TraineeOnTrainingProgramRepository;
import dev.gethealthy.app.repositories.TraineeRepository;
import dev.gethealthy.app.repositories.TrainingProgramApplicationRepository;
import dev.gethealthy.app.repositories.TrainingProgramRepository;
import dev.gethealthy.app.services.NotificationService;
import dev.gethealthy.app.services.TrainingProgramApplicationService;
import dev.gethealthy.app.util.Utility;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class TrainingProgramApplicationServiceImpl extends CrudJpaService<TrainingProgramApplication, TrainingProgramApplicationId> implements TrainingProgramApplicationService {
    private final TrainingProgramApplicationRepository trainingProgramApplicationRepository;
    private final TraineeOnTrainingProgramRepository traineeOnTrainingProgramRepository;
    private final TrainingProgramRepository trainingProgramRepository;
    private final TraineeRepository traineeRepository;
    private final NotificationService notificationService;

    public TrainingProgramApplicationServiceImpl(TrainingProgramApplicationRepository trainingProgramApplicationRepository, ModelMapper modelMapper, TraineeOnTrainingProgramRepository traineeOnTrainingProgramRepository, TrainingProgramRepository trainingProgramRepository, TraineeRepository traineeRepository, NotificationService notificationService) {
        super(trainingProgramApplicationRepository, modelMapper, TrainingProgramApplication.class);
        this.trainingProgramApplicationRepository=trainingProgramApplicationRepository;
        this.traineeOnTrainingProgramRepository=traineeOnTrainingProgramRepository;
        this.trainingProgramRepository=trainingProgramRepository;
        this.traineeRepository=traineeRepository;
        this.notificationService=notificationService;
    }

    @Override
    public List<TrainingProgramApplicationResponse> getAllApplicationsForTrainingProgram(Integer programId) {
        TrainingProgram trainingProgram = trainingProgramRepository.findById(programId).orElseThrow(NotFoundException::new);
        /*JWTUser user = Utility.getJwtUser();
        if (user == null)
            throw new UnauthorizedException();
        if (!user.getUserId().equals(trainingProgram.getTrainer().getUserId()))
            throw new ForbiddenException(); */

        return trainingProgramApplicationRepository
                .findByProgram_IdOrderByMarkReadAsc(programId)
                .stream()
                .map(e -> modelMapper.map(e, TrainingProgramApplicationResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public Page<TrainingProgramApplicationResponse> getAllApplicationsForTrainer(Integer trainerId, Pageable page) {
        return trainingProgramApplicationRepository
                .findByProgram_Trainer_IdOrderByMarkReadAsc(trainerId, page)
                .map(e -> modelMapper.map(e, TrainingProgramApplicationResponse.class));
    }

    @Override
    public Page<TrainingProgramApplicationResponse> getAllApplicationsForTrainerFiltered(Integer userId, String filter, Pageable page) {
        return trainingProgramApplicationRepository
                .findAllTrainerApplicationsFiltered(userId, filter, page)
                .map(e -> modelMapper.map(e, TrainingProgramApplicationResponse.class));
    }

    @Override
    public SingleTrainingProgramApplicationResponse getProgramApplication(TrainingProgramApplicationId id) {
        TrainingProgramApplication entity = trainingProgramApplicationRepository
                .findById((id))
                .orElseThrow(NotFoundException::new);
        /*JWTUser user = Utility.getJwtUser();
        if (user == null)
            throw new UnauthorizedException();
        if (!user.getUserId().equals(entity.getTrainingProgram().getTrainer().getUserId()))
            throw new ForbiddenException();*/

        return modelMapper.map(entity, SingleTrainingProgramApplicationResponse.class);
    }

    @Override
    public TrainingProgramApplicationResponse insertTrainingProgramApplication(TrainingProgramApplicationRequest request) {
        TrainingProgramApplication entity = modelMapper.map(request, TrainingProgramApplication.class);
        entity.setMarkRead(false);
        entity.setSubmissionDate(Utility.getInstantCurrentDate());
        TrainingProgram trainingProgram = trainingProgramRepository.findById(request.getProgramId()).orElseThrow(NotFoundException::new);
        Trainee trainee = traineeRepository.findById(request.getTraineeId()).orElseThrow(NotFoundException::new);

        if (traineeOnTrainingProgramRepository.existsByProgram_IdAndUser_Id(trainingProgram.getId(), trainee.getId()))
            throw new BadRequestException();

        if (trainingProgramApplicationRepository.existsByProgram_IdAndUser_Id(trainingProgram.getId(), trainee.getId()))
            throw new ConflictException();

        entity.setProgram(trainingProgram);
        entity.setUser(trainee);
        trainingProgramApplicationRepository.saveAndFlush(entity);

        return modelMapper.map(entity, TrainingProgramApplicationResponse.class);
    }

    @Override
    public void processTrainingProgramApplication(TrainingProgramApplicationId id, TrainingProgramApplicationProcessRequest request) {
        TrainingProgramApplication application = trainingProgramApplicationRepository
                .findById(id)
                .orElseThrow(NotFoundException::new);
        /*JWTUser user = Utility.getJwtUser();
        if (user == null)
            throw new UnauthorizedException();
        if (!user.getUserId().equals(application.getTrainingProgram().getTrainer().getUserId()))
            throw new ForbiddenException();*/

        if (request.getApprove()) {
            TraineeOnTrainingProgram entity = new TraineeOnTrainingProgram();
            entity.setJoinDate(Utility.getInstantCurrentDate());
            entity.setProgram(application.getProgram());
            entity.setUser(application.getUser());
            traineeOnTrainingProgramRepository.saveAndFlush(entity);

            notificationService.createNotification(
                    application.getUser(),
                    application.getProgram().getTrainer(),
                    application.getProgram().getName(),
                    NotificationType.PROGRAM_APPLICATION_ACCEPTED,
                    application.getNote()
            );
        } else {
            notificationService.createNotification(
                    application.getUser(),
                    application.getProgram().getTrainer(),
                    application.getProgram().getName(),
                    NotificationType.PROGRAM_APPLICATION_ACCEPTED,
                    application.getNote()
            );
        }
        trainingProgramApplicationRepository.deleteById(id);
    }

    @Override
    public void markTrainingProgramApplicationAsRead(TrainingProgramApplicationId id) {
        TrainingProgramApplication application = trainingProgramApplicationRepository
                .findById(id)
                .orElseThrow(NotFoundException::new);
        /*JWTUser user = Utility.getJwtUser();
        if (user == null)
            throw new UnauthorizedException();
        if (!user.getUserId().equals(application.getTrainingProgram().getTrainer().getUserId()))
            throw new ForbiddenException(); */

        application.setMarkRead(true);
        trainingProgramApplicationRepository.saveAndFlush(application);

    }
}
