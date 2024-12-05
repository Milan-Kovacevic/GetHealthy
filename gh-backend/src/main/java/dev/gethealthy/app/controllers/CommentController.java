package dev.gethealthy.app.controllers;

import dev.gethealthy.app.base.CrudController;
import dev.gethealthy.app.exceptions.UnauthorizedException;
import dev.gethealthy.app.models.requests.CommentRequest;
import dev.gethealthy.app.models.responses.CommentResponse;
import dev.gethealthy.app.services.CommentService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${gethealthy.base-url}")
public class CommentController extends CrudController<Integer, CommentRequest, CommentResponse> {
    private final CommentService commentService;
    public CommentController(CommentService commentService) {
        super(commentService, CommentResponse.class);
        this.commentService=commentService;
    }

    @GetMapping("/training-programs/{programId}/comments")
    Page<CommentResponse> getAllTrainingProgramComments(@PathVariable(name = "programId") Integer programId, Pageable page) {
        return commentService.getAllTrainingProgramComments(programId, page);
    }

    @PostMapping("/training-programs/{programId}/comments")
    @ResponseStatus(HttpStatus.CREATED)
    public CommentResponse addCommentOnTrainingProgram(@PathVariable(name = "programId") Integer id,
                                                       @RequestBody @Valid CommentRequest request, Authentication auth) {
        if (auth == null)
            throw new UnauthorizedException();
//        JWTUser jwtUser = (JWTUser) auth.getPrincipal();
//        if (!jwtUser.getUserId().equals(request.getTraineeId()))
//            throw new ForbiddenException();
        return commentService.saveCommentOnTrainingProgram(id, request);
    }
}
