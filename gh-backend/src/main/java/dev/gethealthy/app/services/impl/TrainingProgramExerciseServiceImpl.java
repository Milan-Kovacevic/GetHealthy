package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.exceptions.NotFoundException;
import dev.gethealthy.app.models.entities.Exercise;
import dev.gethealthy.app.models.entities.ExerciseSet;
import dev.gethealthy.app.models.entities.TrainingProgram;
import dev.gethealthy.app.models.entities.TrainingProgramExercise;
import dev.gethealthy.app.models.requests.TrainingProgramExerciseRequest;
import dev.gethealthy.app.models.requests.TrainingProgramExercisesRequest;
import dev.gethealthy.app.models.responses.ProgramExerciseResponse;
import dev.gethealthy.app.repositories.ExerciseRepository;
import dev.gethealthy.app.repositories.TrainingProgramExerciseRepository;
import dev.gethealthy.app.repositories.TrainingProgramRepository;
import dev.gethealthy.app.services.TrainingProgramExerciseService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrainingProgramExerciseServiceImpl extends CrudJpaService<TrainingProgramExercise, Integer> implements TrainingProgramExerciseService {
    private final TrainingProgramExerciseRepository trainingProgramExerciseRepository;
    private final ExerciseRepository exerciseRepository;
    private final TrainingProgramRepository trainingProgramRepository;

    public TrainingProgramExerciseServiceImpl(TrainingProgramExerciseRepository repository, ModelMapper modelMapper, ExerciseRepository exerciseRepository, TrainingProgramRepository trainingProgramRepository) {
        super(repository, modelMapper, TrainingProgramExercise.class);
        this.trainingProgramExerciseRepository = repository;
        this.exerciseRepository = exerciseRepository;
        this.trainingProgramRepository= trainingProgramRepository;
    }

    @Override
    public List<ProgramExerciseResponse> getTrainingProgramExercises(Integer programId) {
        return trainingProgramExerciseRepository
                .findAllByProgram_Id(programId)
                .stream()
                .sorted(Comparator.comparingInt(TrainingProgramExercise::getPosition))
                .map(e -> {
                    var respObj = modelMapper.map(e, ProgramExerciseResponse.class);
                    modelMapper.map(e.getExercise(), respObj);
                    return respObj;
                })
                .toList();
    }

    @Transactional
    @Override
    public void updateTrainingProgramExercises(Integer programId,
                                               TrainingProgramExercisesRequest trainingProgramExercisesRequest) {
        TrainingProgram trainingProgram = trainingProgramRepository.findById(programId)
                .orElseThrow(() -> new NotFoundException("Training program not found: " + programId));

        // ❌ Don't use .clear(), instead DELETE existing records from the database
        trainingProgramExerciseRepository.deleteByProgram_Id(programId);

        if (trainingProgramExercisesRequest.getTrainingProgramExercises() == null) {
            trainingProgramRepository.saveAndFlush(trainingProgram);
            return;
        }

        // Map and add new TrainingProgramExercises and ExerciseSets
        mapAndAddNewProgramExercises(trainingProgramExercisesRequest, trainingProgram, exerciseRepository);

        // Save the updated training program
        trainingProgramRepository.saveAndFlush(trainingProgram);
    }


    static void mapAndAddNewProgramExercises(TrainingProgramExercisesRequest trainingProgramExercisesRequest, TrainingProgram trainingProgram, ExerciseRepository exerciseRepository) {
        List<TrainingProgramExercise> trainingProgramExercises = new ArrayList<>();
        for (TrainingProgramExerciseRequest exerciseRequest : trainingProgramExercisesRequest
                .getTrainingProgramExercises()) {
            // Find the exercise by ID (Exercise itself should not be removed)
            Exercise exercise = exerciseRepository.findById(exerciseRequest.getExerciseId())
                    .orElseThrow(
                            () -> new NotFoundException("Exercise not found: " + exerciseRequest.getExerciseId()));

            // Create a new TrainingProgramExercise and set the position and programId
            TrainingProgramExercise trainingProgramExercise = new TrainingProgramExercise();
            trainingProgramExercise.setPosition(exerciseRequest.getPosition());
            trainingProgramExercise.setExercise(exercise);
            trainingProgramExercise.setProgram(trainingProgram); // Associate the training program

            // Map the exercise sets
            if (exerciseRequest.getExerciseSets() != null) {
                List<ExerciseSet> exerciseSets = exerciseRequest.getExerciseSets().stream()
                        .map(exerciseSetRequest -> {
                            ExerciseSet exerciseSet = new ExerciseSet();
                            exerciseSet.setRestTime(exerciseSetRequest.getRestTime());
                            exerciseSet.setFirstMetricValue(exerciseSetRequest.getFirstMetricValue());
                            exerciseSet.setSecondMetricValue(exerciseSetRequest.getSecondMetricValue());
                            exerciseSet.setProgramExercise(trainingProgramExercise); // Associate exercise set with
                            // the exercise
                            return exerciseSet;
                        }).collect(Collectors.toList());

                trainingProgramExercise.setExerciseSets(exerciseSets);
            }

            trainingProgramExercises.add(trainingProgramExercise);
        }

        trainingProgram.getTrainingProgramExercises().addAll(trainingProgramExercises);
    }
}
