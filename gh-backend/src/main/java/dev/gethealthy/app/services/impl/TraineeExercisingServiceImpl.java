package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.exceptions.NotFoundException;
import dev.gethealthy.app.models.entities.TraineeExercising;
import dev.gethealthy.app.models.requests.WorkoutSummaryRequest;
import dev.gethealthy.app.models.responses.ExerciseMetricResponse;
import dev.gethealthy.app.models.responses.WorkoutSummaryResponse;
import dev.gethealthy.app.repositories.ExerciseFeedbackRepository;
import dev.gethealthy.app.repositories.TraineeExercisingRepository;
import dev.gethealthy.app.repositories.TrainingScheduleRepository;
import dev.gethealthy.app.services.TraineeExercisingService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional
public class TraineeExercisingServiceImpl extends CrudJpaService<TraineeExercising, Integer> implements TraineeExercisingService {

    private final TraineeExercisingRepository traineeExercisingRepository;
    private final TrainingScheduleRepository trainingScheduleRepository;
    private final ExerciseFeedbackRepository exerciseFeedbackRepository;

    public TraineeExercisingServiceImpl(TraineeExercisingRepository repository, ModelMapper modelMapper, TraineeExercisingRepository traineeExercisingRepository, TrainingScheduleRepository trainingScheduleRepository, ExerciseFeedbackRepository exerciseFeedbackRepository) {
        super(repository, modelMapper, TraineeExercising.class);
        this.traineeExercisingRepository = repository;
        this.trainingScheduleRepository = trainingScheduleRepository;
        this.exerciseFeedbackRepository = exerciseFeedbackRepository;
    }

    @Override
    public WorkoutSummaryResponse getWorkoutSummary(WorkoutSummaryRequest request) {
        WorkoutSummaryResponse response = new WorkoutSummaryResponse();

        var trainingScheduleProgram = trainingScheduleRepository
                .findById(request.getProgramScheduleId())
                .orElseThrow(NotFoundException::new);

        response.setId(trainingScheduleProgram.getId());
        var program = trainingScheduleProgram.getProgram();
        var programExercises = program
                .getTrainingProgramExercises()
                .stream()
                .map(
                        tpe -> new WorkoutSummaryResponse.WorkoutExercise(
                                null,
                                tpe.getExerciseSets().stream().map(esf -> modelMapper.map(esf, WorkoutSummaryResponse.WorkoutSet.class)).toList(),
                                null,
                                tpe.getExercise().getId(),
                                tpe.getExercise().getName(),
                                tpe.getExercise().getDescription(),
                                tpe.getExercise().getVideoLink(),
                                modelMapper.map(tpe.getExercise().getFirstExerciseMetric(), ExerciseMetricResponse.class),
                                tpe.getExercise().getSecondExerciseMetric() != null ? modelMapper.map(tpe.getExercise().getSecondExerciseMetric(), ExerciseMetricResponse.class) : null
                        ))
                .collect(Collectors.toList());
        response.setProgramExercises(programExercises);

        var traineeExercising = traineeExercisingRepository.findByProgramIdAndUserIdOrderByDateTakenDesc(program.getId(), request.getTraineeId());

        if (traineeExercising.isEmpty()) {
            return response;
        }

        response.setDateTaken(traineeExercising.get(0).getDateTaken());
        response.setTraineeExercisingId(traineeExercising.get(0).getId());

        var exercisesFeedback = traineeExercising.get(0).getExercisesFeedback();
        response.getProgramExercises().forEach(
                e -> {
                    var exerciseFeedbackResult = exercisesFeedback.stream().filter(ef -> Objects.equals(ef.getExercise().getId(), e.getId())).findFirst();
                    if (exerciseFeedbackResult.isPresent()) {
                        var exerciseFeedback = exerciseFeedbackResult.get();
                        e.setExerciseFeedbackId(exerciseFeedback.getId());
                        e.getExerciseSetsFeedback().forEach(esf -> {
                            var exerciseSetFeedbackResult = exerciseFeedback.getExerciseSetsFeedback().stream().filter(sets -> Objects.equals(sets.getId(), esf.getId())).findFirst();
                            if (exerciseSetFeedbackResult.isPresent()) {
                                var exerciseSetFeedback = exerciseSetFeedbackResult.get();
                                esf.setSetFeedbackId(exerciseSetFeedback.getId());
                                esf.setFirstMetricValueFeedback(exerciseSetFeedback.getFirstMetricValueFeedback());
                                esf.setSecondMetricValueFeedback(exerciseSetFeedback.getSecondMetricValueFeedback());
                                esf.setSkipped(exerciseSetFeedback.getSkipped());
                                esf.setCompleted(exerciseSetFeedback.getCompleted());
                            }
                        });
                        e.setSkipped(exerciseFeedback.getSkipped());
                    }
                }
        );

        return response;
    }
}
