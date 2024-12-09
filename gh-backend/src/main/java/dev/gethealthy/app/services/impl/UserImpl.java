package dev.gethealthy.app.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import dev.gethealthy.app.exceptions.NotFoundException;
import dev.gethealthy.app.models.entities.Trainee;
import dev.gethealthy.app.models.entities.Trainer;
import dev.gethealthy.app.models.requests.TraineeRequest;
import dev.gethealthy.app.models.requests.TrainerRequest;
import dev.gethealthy.app.models.responses.TraineeResponse;
import dev.gethealthy.app.models.responses.TrainerResponse;
import dev.gethealthy.app.repositories.TraineeRepository;
import dev.gethealthy.app.repositories.TrainerRepository;
import dev.gethealthy.app.repositories.UserRepository;
import dev.gethealthy.app.services.UserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserImpl implements UserService {
    private final UserRepository userRepository;
    private final TrainerRepository trainerRepository;
    private final TraineeRepository traineeRepository;
    private final ModelMapper modelMapper;

    @Override
    public TrainerResponse getTrainer(Integer trainerId) {
        Trainer trainer = trainerRepository.findById(trainerId).orElseThrow(NotFoundException::new);

        TrainerResponse trainerResponse = modelMapper.map(trainer, TrainerResponse.class);
        return trainerResponse;
    }

    @Override
    public TraineeResponse getTrainee(Integer traineeId) {
        Trainee trainee = traineeRepository.findById(traineeId).orElseThrow(NotFoundException::new);

        TraineeResponse traineeResponse = modelMapper.map(trainee, TraineeResponse.class);
        return traineeResponse;
    }

    @Override
    public void updateTrainer(TrainerRequest request) {
        Trainer trainer = trainerRepository.findById(request.getId()).orElseThrow(NotFoundException::new);

        trainer = modelMapper.map(request, Trainer.class);
        trainerRepository.saveAndFlush(trainer);
    }

    @Override
    public void updateTrainee(TraineeRequest request) {
        Trainee trainee = traineeRepository.findById(request.getId()).orElseThrow(NotFoundException::new);

        trainee = modelMapper.map(request, Trainee.class);
        traineeRepository.saveAndFlush(trainee);
    }

}
