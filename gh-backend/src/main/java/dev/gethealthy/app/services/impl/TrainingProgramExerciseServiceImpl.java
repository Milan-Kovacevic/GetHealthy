package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.models.entities.TrainingProgram;
import dev.gethealthy.app.models.entities.TrainingProgramExercise;
import dev.gethealthy.app.models.requests.TrainingProgramExerciseRequest;
import dev.gethealthy.app.models.responses.ProgramExerciseResponse;
import dev.gethealthy.app.repositories.ExerciseSetRepository;
import dev.gethealthy.app.repositories.TrainingProgramExerciseRepository;
import dev.gethealthy.app.repositories.TrainingProgramRepository;
import dev.gethealthy.app.services.TrainingProgramExerciseService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class TrainingProgramExerciseServiceImpl extends CrudJpaService<TrainingProgramExercise, Integer> implements TrainingProgramExerciseService {
    private final TrainingProgramExerciseRepository trainingProgramExerciseRepository;

    public TrainingProgramExerciseServiceImpl(TrainingProgramExerciseRepository repository, ModelMapper modelMapper, ExerciseSetRepository exerciseSetRepository) {
        super(repository, modelMapper, TrainingProgramExercise.class);
        this.trainingProgramExerciseRepository = repository;
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
}
