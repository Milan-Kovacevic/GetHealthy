package dev.gethealthy.app.services;

import dev.gethealthy.app.base.CrudService;
import dev.gethealthy.app.models.requests.TrainingProgramExerciseRequest;
import dev.gethealthy.app.models.requests.TrainingProgramExercisesRequest;
import dev.gethealthy.app.models.responses.ProgramExerciseResponse;

import java.util.List;

public interface TrainingProgramExerciseService extends CrudService<Integer>{
    List<ProgramExerciseResponse> getTrainingProgramExercises(Integer programId);

    void updateTrainingProgramExercises(Integer programId, TrainingProgramExercisesRequest trainingProgramExercisesRequest);
}
