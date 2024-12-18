package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.models.entities.TrainingProgram;
import dev.gethealthy.app.models.entities.TrainingProgramExercise;
import dev.gethealthy.app.models.requests.TrainingProgramExerciseRequest;
import dev.gethealthy.app.repositories.ExerciseSetRepository;
import dev.gethealthy.app.repositories.TrainingProgramExerciseRepository;
import dev.gethealthy.app.repositories.TrainingProgramRepository;
import dev.gethealthy.app.services.TrainingProgramExerciseService;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class TrainingProgramExerciseServiceImpl extends CrudJpaService<TrainingProgramExercise, Integer> implements TrainingProgramExerciseService {
    private final ExerciseSetRepository exerciseSetRepository;

    public TrainingProgramExerciseServiceImpl(TrainingProgramExerciseRepository repository, ModelMapper modelMapper, ExerciseSetRepository exerciseSetRepository) {
        super(repository, modelMapper, TrainingProgramExercise.class);
        this.exerciseSetRepository = exerciseSetRepository;
    }

    @Override
    public void insertExerciseToProgram(TrainingProgramExerciseRequest request) {
        var programExercise = getModelMapper().map(request, TrainingProgramExercise.class);
        programExercise.setId(null);
        programExercise = getRepository().saveAndFlush(programExercise);
        getEntityManager().refresh(programExercise);
        for (var req : request.getExerciseSets()) {
            var mapped = getModelMapper().map(req, dev.gethealthy.app.models.entities.ExerciseSet.class);
            //mapped.setProgramExericse(programExercise);
            exerciseSetRepository.save(mapped);
        }
        getRepository().flush();
    }
}
