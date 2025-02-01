package dev.gethealthy.app.services.impl;

import dev.gethealthy.app.base.CrudJpaService;
import dev.gethealthy.app.exceptions.NotFoundException;
import dev.gethealthy.app.models.entities.Comment;
import dev.gethealthy.app.models.entities.Trainee;
import dev.gethealthy.app.models.entities.TrainingProgram;
import dev.gethealthy.app.models.enums.NotificationType;
import dev.gethealthy.app.models.requests.CommentRequest;
import dev.gethealthy.app.models.responses.CommentResponse;
import dev.gethealthy.app.repositories.CommentRepository;
import dev.gethealthy.app.repositories.TraineeRepository;
import dev.gethealthy.app.repositories.TrainerRepository;
import dev.gethealthy.app.repositories.TrainingProgramRepository;
import dev.gethealthy.app.services.CommentService;
import dev.gethealthy.app.services.NotificationService;
import dev.gethealthy.app.util.Utility;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final TrainingProgramRepository trainingProgramRepository;
    private final TraineeRepository traineeRepository;
    private final TrainerRepository trainerRepository;
    private final NotificationService notificationService;
    private final ModelMapper modelMapper;

    @Override
    public Page<CommentResponse> getAllTrainingProgramComments(Integer programId, Pageable page) {
        return commentRepository
                .findAllByProgram_Id_OrderByDatePostedDesc(programId, page)
                .map(e -> {
                    CommentResponse comment = modelMapper.map(e, CommentResponse.class);
                    comment.setAuthorFirstName(e.getUser().getFirstName());
                    comment.setAuthorLastName(e.getUser().getLastName());
                    comment.setAuthorId(e.getUser().getId());
                    comment.setAuthorProfilePictureFilePath(e.getUser().getProfilePictureFilePath());
                    return comment;
                });
    }

    @Override
    public CommentResponse saveCommentOnTrainingProgram(Integer programId, CommentRequest request) {
        var traineeOpt = traineeRepository.findById(request.getAuthorId());
        var trainerOpt = trainerRepository.findById(request.getAuthorId());
        var trainingProgram = trainingProgramRepository.findById(programId).orElseThrow(NotFoundException::new);

        if (traineeOpt.isEmpty() && trainerOpt.isEmpty())
            throw new NotFoundException();

        var isProgramOwner = trainerOpt.isPresent() && Objects.equals(trainerOpt.get().getId(), trainingProgram.getTrainer().getId());
        if (!isProgramOwner && traineeOpt.isEmpty())
            throw new NotFoundException();

        Comment entity = modelMapper.map(request, Comment.class);
        entity.setId(null);
        var user = traineeOpt.isPresent() ? traineeOpt.get() : trainerOpt.get();
        entity.setUser(user);
        entity.setDatePosted(Utility.getInstantCurrentDate());
        entity.setProgram(trainingProgram);

        commentRepository.save(entity);
        if (!isProgramOwner) {
            notificationService.createNotification(
                    trainingProgram.getTrainer(),
                    user,
                    trainingProgram.getName(),
                    NotificationType.NEW_COMMENT_ON_PROGRAM
            );
        }

        CommentResponse comment = modelMapper.map(entity, CommentResponse.class);
        comment.setAuthorFirstName(user.getFirstName());
        comment.setAuthorLastName(user.getLastName());
        comment.setAuthorId(user.getId());
        comment.setAuthorProfilePictureFilePath(user.getProfilePictureFilePath());

        return comment;
    }
}
