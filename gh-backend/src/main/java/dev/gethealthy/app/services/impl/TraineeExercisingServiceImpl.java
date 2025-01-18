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

        if (!traineeExercising.isEmpty()) {
            response.setDateTaken(traineeExercising.getFirst().getDateTaken());
            response.setTraineeExercisingId(traineeExercising.getFirst().getId());
        }
        var exerciseFeedback = exerciseFeedbackRepository.findByTraineeExercisingIdAndProgramExerciseId(traineeExercising.getFirst().getId(), program.getId()).get();
        response.setProgramExercises(program.getTrainingProgramExercises().stream().map(e -> new WorkoutSummaryResponse.WorkoutExercise(
            exerciseFeedback.getId(),
            exerciseFeedback.getExerciseSetsFeedback().stream().map(ef-> modelMapper.map(ef, WorkoutSummaryResponse.WorkoutSet.class)).collect(Collectors.toList()),
            exerciseFeedback.getSkipped(),
            exerciseFeedback.getExercise().getId(),
            exerciseFeedback.getExercise().getName(),
            exerciseFeedback.getExercise().getDescription(),
            exerciseFeedback.getExercise().getVideoLink(),
            modelMapper.map(exerciseFeedback.getExercise().getFirstExerciseMetric(), ExerciseMetricResponse.class),
            modelMapper.map(exerciseFeedback.getExercise().getSecondExerciseMetric(), ExerciseMetricResponse.class)
        )).collect(Collectors.toList()));

        return response;
    }
}
