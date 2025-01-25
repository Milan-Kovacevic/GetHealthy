package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.models.entities.TrainingProgramOnSchedule;
import dev.gethealthy.app.models.enums.ScheduleItemState;
import dev.gethealthy.app.models.requests.TrainingScheduleRequest;
import dev.gethealthy.app.models.responses.TrainingScheduleResponse;
import dev.gethealthy.app.repositories.*;
import dev.gethealthy.app.services.TraineeExercisingService;
import dev.gethealthy.app.services.TrainingScheduleService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.time.*;
import java.time.temporal.TemporalAdjusters;
import java.time.temporal.WeekFields;
import java.util.List;
import java.util.Locale;

@Service
@Transactional
public class TrainingScheduleServiceImpl extends CrudJpaService<TrainingProgramOnSchedule, Integer> implements TrainingScheduleService {

    private final TraineeExercisingRepository traineeExercisingRepository;
    private final TraineeOnTrainingProgramRepository traineeOnTrainingProgramRepository;
    private final TrainingProgramRepository trainingProgramRepository;
    private final TrainingScheduleRepository trainingScheduleRepository;
    private final TrainingProgramExerciseRepository trainingProgramExerciseRepository;

    public TrainingScheduleServiceImpl(TrainingScheduleRepository repository,
                                       ModelMapper modelMapper,
                                       TraineeExercisingRepository traineeExercisingRepository,
                                       TraineeOnTrainingProgramRepository traineeOnTrainingProgramRepository,
                                       TrainingProgramRepository trainingProgramRepository,
                                       TrainingScheduleRepository trainingScheduleRepository,
                                        TrainingProgramExerciseRepository trainingProgramExerciseRepository) {
        super(repository, modelMapper, TrainingProgramOnSchedule.class);
        this.traineeOnTrainingProgramRepository = traineeOnTrainingProgramRepository;
        this.trainingProgramRepository = trainingProgramRepository;
        this.trainingScheduleRepository = trainingScheduleRepository;
        this.traineeExercisingRepository = traineeExercisingRepository;
        this.trainingProgramExerciseRepository = trainingProgramExerciseRepository;
    }

    @Override
    public List<TrainingScheduleResponse> getScheduleForTrainer(Integer userId) {
        var trainerPrograms = trainingProgramRepository.findAllByTrainer_Id(userId);
        var trainerProgramSchedules = trainingScheduleRepository.findAllByProgramIdIn(trainerPrograms.stream().map(tp->tp.getId()).toList());
        return trainerProgramSchedules.stream().map(tps -> modelMapper.map(tps, TrainingScheduleResponse.class)).toList();
    }

    @Override
    public List<TrainingScheduleResponse> getScheduleForTrainee(Integer userId) {
        var traineeOnTrainingPrograms = traineeOnTrainingProgramRepository.findAllByUserId(userId);
        var trainingProgramSchedules = trainingScheduleRepository.findAllByProgramIdIn(traineeOnTrainingPrograms.stream().map(totp-> totp.getProgram().getId()).toList());
        var trainingProgramSchedulesResponses =  trainingProgramSchedules.stream().map(tps -> modelMapper.map(tps, TrainingScheduleResponse.class)).toList();
        ZoneId zoneId = ZoneId.systemDefault();
        var lastMonday = getFirstDayOfWeek(Instant.now(), Locale.FRANCE);
        trainingProgramSchedulesResponses.forEach(tpsr -> {
            var startDay = lastMonday.plusDays(tpsr.getDayOfWeek().getValue() - 1);
            LocalDateTime localDateTime = LocalDateTime.of(startDay, tpsr.getStartTime());
            var startTime = localDateTime.atZone(zoneId).toInstant();

            var traineeExercisingResult = traineeExercisingRepository.findByProgramIdAndUserIdAndDateTakenAfterOrderByDateTakenAsc(tpsr.getProgram().getId(), userId, startTime);

            if (traineeExercisingResult.isEmpty()) {
                tpsr.setScheduleItemState(ScheduleItemState.NOT_STARTED);
            } else {
                var traineeExercising = traineeExercisingResult.getFirst();
                var program = trainingProgramRepository.findById(tpsr.getProgram().getId()).orElseThrow();
                //var exerciseSetCount = program.getTrainingProgramExercises().stream().mapToInt(tpe -> tpe.getExerciseSets().size()).sum();
                //var exerciseSetFeedbackCount = traineeExercising.getExercisesFeedback().stream().mapToInt(ef -> ef.getExerciseSetsFeedback().size()).sum();
                var exerciseCount = program.getTrainingProgramExercises().size();
                var exerciseFeedbackCount = traineeExercising.getExercisesFeedback().size();
                if (exerciseCount == exerciseFeedbackCount) {
                    tpsr.setScheduleItemState(ScheduleItemState.FINISHED);
                } else {
                    tpsr.setScheduleItemState(ScheduleItemState.IN_PROGRESS);
                }
            }
        });

        return trainingProgramSchedulesResponses;
    }

    public static LocalDate getFirstDayOfWeek(Instant instant, Locale locale) {
        ZonedDateTime zonedDateTime = instant.atZone(ZoneId.systemDefault());
        DayOfWeek firstDayOfWeek = WeekFields.of(locale).getFirstDayOfWeek();
        return zonedDateTime.toLocalDate()
                .with(TemporalAdjusters.previousOrSame(firstDayOfWeek));
    }
}
