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
import dev.gethealthy.app.repositories.TrainingProgramRepository;
import dev.gethealthy.app.services.CommentService;
import dev.gethealthy.app.services.NotificationService;
import dev.gethealthy.app.util.Utility;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl extends CrudJpaService<Comment, Integer> implements CommentService {
    private final CommentRepository commentRepository;
    private final TrainingProgramRepository trainingProgramRepository;
    private final TraineeRepository traineeRepository;
    private final NotificationService notificationService;
    public CommentServiceImpl(CommentRepository commentRepository, ModelMapper modelMapper, TrainingProgramRepository trainingProgramRepository, TraineeRepository traineeRepository, NotificationService notificationService) {
        super(commentRepository, modelMapper, Comment.class);
        this.commentRepository=commentRepository;
        this.trainingProgramRepository=trainingProgramRepository;
        this.traineeRepository=traineeRepository;
        this.notificationService=notificationService;
    }

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
        Comment entity = modelMapper.map(request, Comment.class);
        entity.setDatePosted(Utility.getInstantCurrentDate());
        Trainee trainee = traineeRepository.findById(request.getAuthorId()).orElseThrow(NotFoundException::new);
        entity.setUser(trainee);
        TrainingProgram trainingProgram = trainingProgramRepository.findById(programId).orElseThrow(NotFoundException::new);
        entity.setProgram(trainingProgram);
        commentRepository.save(entity);
        CommentResponse comment = modelMapper.map(entity, CommentResponse.class);
        comment.setAuthorFirstName(trainee.getFirstName());
        comment.setAuthorLastName(trainee.getLastName());
        comment.setAuthorId(trainee.getId());
        comment.setAuthorProfilePictureFilePath(trainee.getProfilePictureFilePath());

        notificationService.createNotification(
                trainingProgram.getTrainer(),
                trainee,
                trainingProgram.getName(),
                NotificationType.NEW_COMMENT_ON_PROGRAM
        );
        return comment;
    }
}
