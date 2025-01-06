package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.models.entities.TrainingProgramExercise;
import dev.gethealthy.app.models.responses.ProgramExerciseResponse;
import dev.gethealthy.app.repositories.TrainingProgramExerciseRepository;
import dev.gethealthy.app.services.TrainingProgramExerciseService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TrainingProgramExerciseServiceImpl implements TrainingProgramExerciseService {
    private final TrainingProgramExerciseRepository trainingProgramExerciseRepository;
    private final ModelMapper modelMapper;

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
