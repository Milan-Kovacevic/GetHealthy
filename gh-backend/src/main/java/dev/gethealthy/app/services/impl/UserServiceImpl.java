package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.exceptions.BadRequestException;
import dev.gethealthy.app.exceptions.ForbiddenException;
import dev.gethealthy.app.exceptions.NotFoundException;
import dev.gethealthy.app.models.entities.Trainee;
import dev.gethealthy.app.models.entities.Trainer;
import dev.gethealthy.app.models.entities.User;
import dev.gethealthy.app.models.entities.UserAccount;
import dev.gethealthy.app.models.enums.Role;
import dev.gethealthy.app.models.enums.StorageType;
import dev.gethealthy.app.models.requests.TraineeUpdateRequest;
import dev.gethealthy.app.models.requests.TrainerUpdateRequest;
import dev.gethealthy.app.models.requests.UserUpdateRequest;
import dev.gethealthy.app.models.responses.*;
import dev.gethealthy.app.repositories.TraineeOnTrainingProgramRepository;
import dev.gethealthy.app.repositories.UserRepository;
import dev.gethealthy.app.services.StorageAccessService;
import dev.gethealthy.app.services.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final StorageAccessService storageAccessService;
    private final TraineeOnTrainingProgramRepository traineeOnTrainingProgramRepository;

    // @Override
    // public SingleUserResponse getUser(Integer userId) {
    // User user =
    // userRepository.findById(userId).orElseThrow(NotFoundException::new);
    // UserAccount userAccount = user.getUserAccount();
    // if (userAccount.getRole().equals(Role.TRAINEE) && user instanceof Trainee) {
    // return modelMapper.map(user, TraineeResponse.class);
    // } else if (userAccount.getRole().equals(Role.TRAINER) && user instanceof
    // Trainer) {
    // return modelMapper.map(user, TrainerResponse.class);
    // } else {
    // throw new ForbiddenException();
    // }
    // }

    // @Override
    // public UserInfoResponse getUserInfo(Integer userId) {
    // User user =
    // userRepository.findById(userId).orElseThrow(NotFoundException::new);
    // UserAccount userAccount = user.getUserAccount();
    // if (userAccount.getRole().equals(Role.TRAINEE) && user instanceof Trainee) {
    // return modelMapper.map(user, TraineeInfoResponse.class);
    // } else if (userAccount.getRole().equals(Role.TRAINER) && user instanceof
    // Trainer) {
    // return modelMapper.map(user, TrainerInfoResponse.class);
    // } else {
    // throw new ForbiddenException();
    // }
    // }

    // private <T> T getUserData(Integer userId, Class<T> responseType) {
    // User user =
    // userRepository.findById(userId).orElseThrow(NotFoundException::new);
    // UserAccount userAccount = user.getUserAccount();

    // if (userAccount.getRole().equals(Role.TRAINEE) && user instanceof Trainee) {
    // return modelMapper.map(user, responseType);
    // } else if (userAccount.getRole().equals(Role.TRAINER) && user instanceof
    // Trainer) {
    // return modelMapper.map(user, responseType);
    // } else {
    // throw new ForbiddenException();
    // }
    // }

    private <T> T getUserData(Integer userId, Class<T> responseType) {
        User user = userRepository.findById(userId).orElseThrow(NotFoundException::new);
        UserAccount userAccount = user.getUserAccount();

        if (userAccount.getRole().equals(Role.TRAINEE) && user instanceof Trainee) {
            if (responseType.equals(SingleUserResponse.class)) {
                return responseType.cast(modelMapper.map(user, TraineeResponse.class));
            } else if (responseType.equals(UserInfoResponse.class)) {
                return responseType.cast(modelMapper.map(user, TraineeInfoResponse.class));
            }
        } else if (userAccount.getRole().equals(Role.TRAINER) && user instanceof Trainer) {
            if (responseType.equals(SingleUserResponse.class)) {
                return responseType.cast(modelMapper.map(user, TrainerResponse.class));
            } else if (responseType.equals(UserInfoResponse.class)) {
                return responseType.cast(modelMapper.map(user, TrainerInfoResponse.class));
            }
        }

        throw new ForbiddenException();
    }

    @Override
    public SingleUserResponse getUser(Integer userId) {
        return getUserData(userId, SingleUserResponse.class);
    }

    @Override
    public UserInfoResponse getUserInfo(Integer userId) {
        return getUserData(userId, UserInfoResponse.class);
    }

    @Override
    public void updateUser(Integer userId, UserUpdateRequest request, MultipartFile file) {
        User user = userRepository.findById(userId).orElseThrow(NotFoundException::new);
        UserAccount userAccount = user.getUserAccount();

        if (userAccount.getRole().equals(Role.TRAINER) && request instanceof TrainerUpdateRequest) {
            Trainer trainer = (Trainer) user;
            updateUserEntity(trainer, request, file);
        } else if (userAccount.getRole().equals(Role.TRAINEE) && request instanceof TraineeUpdateRequest) {
            Trainee trainee = (Trainee) user;
            updateUserEntity(trainee, request, file);
        } else
            throw new ForbiddenException();
    }

    private <T extends User> void updateUserEntity(T userEntity, UserUpdateRequest request, MultipartFile file) {
        modelMapper.map(request, userEntity);
        if (file != null && !file.isEmpty()) {
            String savedFileName = handleFileUpload(userEntity.getProfilePictureFilePath(), file);
            userEntity.setProfilePictureFilePath(savedFileName);
        }
        userRepository.saveAndFlush(userEntity);
    }

    private String handleFileUpload(String existingFilePath, MultipartFile file) {
        try {
            String savedFileName = storageAccessService.saveToFile(file.getOriginalFilename(), file.getBytes(),
                    StorageType.PICTURE);
            if (existingFilePath != null && !existingFilePath.isEmpty()) {
                storageAccessService.deleteFile(existingFilePath, StorageType.PICTURE);
            }
            return savedFileName;
        } catch (IOException ex) {
            throw new RuntimeException("Error handling file upload", ex);
        }
    }

    @Override
    public String updateProfilePicture(Integer userId, MultipartFile file) {
        User user = userRepository.findById(userId).orElseThrow(NotFoundException::new);

        String fileName;
        try {
            if (!user.getProfilePictureFilePath().isEmpty())
                storageAccessService.deleteFile(user.getProfilePictureFilePath(), StorageType.PICTURE);
            fileName = storageAccessService.saveToFile(file.getOriginalFilename(), file.getBytes(),
                    StorageType.PICTURE);
        } catch (IOException ex) {
            throw new RuntimeException("Error handling file upload!", ex);
        }

        if (fileName.isEmpty())
            throw new BadRequestException();

        user.setProfilePictureFilePath(fileName);
        userRepository.saveAndFlush(user);
        return fileName;
    }

    @Override
    public void leaveTrainingProgram(Integer userId, Integer programId) {
        var exists = traineeOnTrainingProgramRepository.existsByProgram_IdAndUser_Id(programId, userId);
        if (!exists)
            throw new NotFoundException();
        traineeOnTrainingProgramRepository.deleteByProgram_IdAndUser_Id(programId, userId);
    }

}
