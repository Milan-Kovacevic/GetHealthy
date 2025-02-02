package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.exceptions.NotFoundException;
import dev.gethealthy.app.models.entities.TraineeExercising;
import dev.gethealthy.app.models.entities.TrainingProgram;
import dev.gethealthy.app.models.entities.TrainingProgramOnSchedule;
import dev.gethealthy.app.models.enums.NotificationType;
import dev.gethealthy.app.models.enums.ScheduleItemState;
import dev.gethealthy.app.models.requests.TrainingScheduleRequest;
import dev.gethealthy.app.models.responses.TrainingScheduleResponse;
import dev.gethealthy.app.repositories.*;
import dev.gethealthy.app.services.NotificationService;
import dev.gethealthy.app.services.TrainingScheduleService;
import dev.gethealthy.app.util.Utility;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional()
@RequiredArgsConstructor
public class TrainingScheduleServiceImpl implements TrainingScheduleService {
    private final TraineeExercisingRepository traineeExercisingRepository;
    private final TraineeOnTrainingProgramRepository traineeOnTrainingProgramRepository;
    private final TrainingProgramRepository trainingProgramRepository;
    private final TrainingScheduleRepository trainingScheduleRepository;
    private final ModelMapper modelMapper;
    private final NotificationService notificationService;
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<TrainingScheduleResponse> getScheduleForTrainer(Integer userId) {
        var trainerProgramIds = trainingProgramRepository
                .findAllByTrainer_Id(userId)
                .stream()
                .map(TrainingProgram::getId)
                .toList();
        var trainerProgramSchedules = trainingScheduleRepository.findAllByProgramIdIn(trainerProgramIds);
        return trainerProgramSchedules
                .stream()
                .map(e -> modelMapper.map(e, TrainingScheduleResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<TrainingScheduleResponse> getScheduleForTrainee(Integer userId) {
        var traineeJoinedPrograms = traineeOnTrainingProgramRepository
                .findAllByUserId(userId)
                .stream()
                .map(e -> e.getProgram().getId())
                .toList();

        var traineeSchedulePrograms = trainingScheduleRepository.findAllByProgramIdIn(traineeJoinedPrograms);
        return traineeSchedulePrograms
                .stream()
                .map(e -> {
                    var result = modelMapper.map(e, TrainingScheduleResponse.class);
                    var traineeWorkouts = traineeExercisingRepository.findByScheduleProgramIdSortedByDateTakenDesc(e.getId());
                    var state = getScheduleProgramState(traineeWorkouts);
                    result.setScheduleItemState(state);
                    return result;
                })
                .collect(Collectors.toList());
    }

    private ScheduleItemState getScheduleProgramState(List<TraineeExercising> traineeExercisingOpt) {
        if (traineeExercisingOpt.isEmpty())
            return ScheduleItemState.NOT_STARTED;

        var traineeExercising = traineeExercisingOpt.get(0); // Take the latest workout
        var exerciseCount = traineeExercising.getProgram().getTrainingProgramExercises().size();
        var exerciseFeedbackCount = traineeExercising.getExercisesFeedback().size();
        if (exerciseCount == exerciseFeedbackCount)
            return ScheduleItemState.FINISHED;
        else
            return ScheduleItemState.IN_PROGRESS;

    }

    @Override
    public TrainingScheduleResponse addProgramOnSchedule(TrainingScheduleRequest request) {
        var entity = modelMapper.map(request, TrainingProgramOnSchedule.class);
        entity.setId(null);
        entity = trainingScheduleRepository.saveAndFlush(entity);
        entityManager.refresh(entity);

        var trainingProgram = entity.getProgram();
        trainingProgram.getTraineeOnTrainingProgram().forEach(trainee -> notificationService
                .createNotification(trainee.getUser(), trainingProgram.getTrainer(), trainingProgram.getName(), NotificationType.PROGRAM_ADDED_ON_SCHEDULE));

        return modelMapper.map(entity, TrainingScheduleResponse.class);
    }

    @Override
    public TrainingScheduleResponse updateTrainingScheduleProgram(Integer id, TrainingScheduleRequest request) {
        if (!trainingScheduleRepository.existsById(id)) {
            throw new NotFoundException();
        }
        var entity = modelMapper.map(request, TrainingProgramOnSchedule.class);
        entity.setId(id);
        entity = trainingScheduleRepository.saveAndFlush(entity);
        entityManager.refresh(entity);
        return modelMapper.map(entity, TrainingScheduleResponse.class);
    }

    @Override
    public void removeProgramFromSchedule(Integer id) {
        var scheduleProgram = trainingScheduleRepository
                .findById(id)
                .orElseThrow(NotFoundException::new);

        var trainingProgram = scheduleProgram.getProgram();
        trainingProgram.getTraineeOnTrainingProgram().forEach(trainee -> notificationService
                .createNotification(trainee.getUser(), trainingProgram.getTrainer(), trainingProgram.getName(), NotificationType.PROGRAM_REMOVED_FROM_SCHEDULE));

        trainingScheduleRepository.deleteById(id);
    }
}
