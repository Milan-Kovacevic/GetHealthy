package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.exceptions.NotFoundException;
import dev.gethealthy.app.models.entities.ProgramRating;
import dev.gethealthy.app.models.entities.TrainingProgram;
import dev.gethealthy.app.models.responses.TrainingProgramResponse;
import dev.gethealthy.app.repositories.RatingRepository;
import dev.gethealthy.app.repositories.TrainingProgramRepository;
import dev.gethealthy.app.services.TrainingProgramService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class TrainingProgramServiceImpl extends CrudJpaService<TrainingProgram, Integer> implements TrainingProgramService {
    private final TrainingProgramRepository trainingProgramRepository;
    private final ModelMapper modelMapper;

    public TrainingProgramServiceImpl(TrainingProgramRepository repository, RatingRepository ratingRepository , ModelMapper modelMapper) {
        super(repository, modelMapper, TrainingProgram.class);
        trainingProgramRepository = repository;
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
}
