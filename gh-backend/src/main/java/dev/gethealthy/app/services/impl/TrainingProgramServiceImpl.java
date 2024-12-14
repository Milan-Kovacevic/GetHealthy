package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.exceptions.NotFoundException;
import dev.gethealthy.app.models.entities.ProgramRating;
import dev.gethealthy.app.models.entities.TrainingProgram;
import dev.gethealthy.app.models.entities.TrainingProgramExercise;
import dev.gethealthy.app.models.responses.ProgramExerciseResponse;
import dev.gethealthy.app.models.responses.SingleProgramDetailsResponse;
import dev.gethealthy.app.models.responses.SingleProgramParticipantResponse;
import dev.gethealthy.app.models.responses.TrainingProgramResponse;
import dev.gethealthy.app.repositories.RatingRepository;
import dev.gethealthy.app.repositories.TraineeOnTrainingProgramRepository;
import dev.gethealthy.app.repositories.TrainingProgramExerciseRepository;
import dev.gethealthy.app.repositories.TrainingProgramRepository;
import dev.gethealthy.app.services.TrainingProgramService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrainingProgramServiceImpl extends CrudJpaService<TrainingProgram, Integer> implements TrainingProgramService {
    private final TrainingProgramRepository trainingProgramRepository;
    private final TrainingProgramExerciseRepository trainingProgramExerciseRepository;
    private final TraineeOnTrainingProgramRepository traineeOnTrainingProgramRepository;
    private final ModelMapper modelMapper;

    public TrainingProgramServiceImpl(TrainingProgramRepository trainingProgramRepository, TrainingProgramExerciseRepository trainingProgramExerciseRepository, TraineeOnTrainingProgramRepository traineeOnTrainingProgramRepository, ModelMapper modelMapper) {
        super(trainingProgramRepository, modelMapper, TrainingProgram.class);
        this.trainingProgramRepository = trainingProgramRepository;
        this.trainingProgramExerciseRepository = trainingProgramExerciseRepository;
        this.traineeOnTrainingProgramRepository = traineeOnTrainingProgramRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public Page<TrainingProgramResponse> findAll(Specification<TrainingProgram> spec, Sort sort, Pageable page) {
        Pageable pageableWithSort = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);
        var dbResponse = trainingProgramRepository.findAll(spec, pageableWithSort);
        var result = dbResponse.map(e -> modelMapper.map(e, TrainingProgramResponse.class));
        for(int i=0;i< result.getContent().size();i++)
        {
            result.getContent().get(i).setRating(dbResponse.getContent().get(i).getTrainingProgramRatings().stream().mapToDouble(ProgramRating::getRate).average().orElse(0.0));
        }
        return result;
    }

    @Override
    public void delete(Integer id)
    {
        var trainingProgram = trainingProgramRepository.findById(id).orElse(null);
        if (trainingProgram == null)
            throw new NotFoundException();
        trainingProgram.setDeleted(true);
        trainingProgramRepository.save(trainingProgram);
    }

    @Override
    public SingleProgramDetailsResponse getTrainingProgramDetails(Integer id) {
        TrainingProgram trainingProgram = trainingProgramRepository.findById(id).orElseThrow(NotFoundException::new);

        var response = modelMapper.map(trainingProgram, SingleProgramDetailsResponse.class);
        var exercises = trainingProgramExerciseRepository
                .findAllByProgram_Id(id)
                .stream()
                .sorted(Comparator.comparingInt(TrainingProgramExercise::getPosition))
                .map(e -> modelMapper.map(e, ProgramExerciseResponse.class))
                .collect(Collectors.toList());
        response.setExercises(exercises);
        return response;
    }

    @Override
    public Page<SingleProgramParticipantResponse> getTrainingProgramParticipants(Integer programId, String filter, Pageable page) {
    var programParticipants = traineeOnTrainingProgramRepository.getAllTraineesOnTrainingProgramFiltered(programId, filter, page);

    return programParticipants.map(e -> modelMapper.map(e, SingleProgramParticipantResponse.class));
    }
}
