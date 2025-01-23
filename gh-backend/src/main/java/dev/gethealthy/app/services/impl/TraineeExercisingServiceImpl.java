package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.exceptions.NotFoundException;
import dev.gethealthy.app.models.entities.ExerciseFeedback;
import dev.gethealthy.app.models.entities.ExerciseSetFeedback;
import dev.gethealthy.app.models.entities.TraineeExercising;
import dev.gethealthy.app.models.requests.StartWorkoutRequest;
import dev.gethealthy.app.models.requests.WorkoutSummaryRequest;
import dev.gethealthy.app.models.responses.ExerciseMetricResponse;
import dev.gethealthy.app.models.responses.StartWorkoutResponse;
import dev.gethealthy.app.models.responses.WorkoutSummaryResponse;
import dev.gethealthy.app.repositories.ExerciseFeedbackRepository;
import dev.gethealthy.app.repositories.ExerciseSetFeedbackRepository;
import dev.gethealthy.app.repositories.TraineeExercisingRepository;
import dev.gethealthy.app.repositories.TrainingScheduleRepository;
import dev.gethealthy.app.services.ExerciseFeedbackService;
import dev.gethealthy.app.services.TraineeExercisingService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

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

        var trainingScheduleProgram = trainingScheduleRepository.findById(request.getProgramScheduleId());
        if (trainingScheduleProgram.isEmpty()) {
            throw new NotFoundException();
        }

        var program = trainingScheduleProgram.get().getProgram();
        var traineeExercising = traineeExercisingRepository.findByProgramIdAndUserIdOrderByDateTakenDesc(program.getId(), request.getTraineeId());

        if (traineeExercising.isEmpty())
            throw new NotFoundException();

        response.setDateTaken(traineeExercising.get(0).getDateTaken());
        response.setTraineeExercisingId(traineeExercising.get(0).getId());

        var exerciseFeedback = traineeExercising.get(0).getExercisesFeedback();
        response.setProgramExercises(exerciseFeedback.stream().map(ef -> new WorkoutSummaryResponse.WorkoutExercise(
                ef.getId(),
                ef.getExerciseSetsFeedback().stream().map(esf-> modelMapper.map(esf, WorkoutSummaryResponse.WorkoutSet.class)).collect(Collectors.toList()),
                ef.getSkipped(),
                ef.getExercise().getId(),
                ef.getExercise().getName(),
                ef.getExercise().getDescription(),
                ef.getExercise().getVideoLink(),
                modelMapper.map(ef.getExercise().getFirstExerciseMetric(), ExerciseMetricResponse.class),
                modelMapper.map(ef.getExercise().getSecondExerciseMetric(), ExerciseMetricResponse.class)
        )).collect(Collectors.toList()));

        return response;
    }
}
