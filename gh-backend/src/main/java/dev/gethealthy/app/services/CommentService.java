package dev.gethealthy.app.services;

import dev.gethealthy.app.base.CrudService;
import dev.gethealthy.app.models.requests.CommentRequest;
import dev.gethealthy.app.models.responses.CommentResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CommentService {
    Page<CommentResponse> getAllTrainingProgramComments(Integer programId, Pageable page);

    CommentResponse saveCommentOnTrainingProgram(Integer programId, CommentRequest request);
}
