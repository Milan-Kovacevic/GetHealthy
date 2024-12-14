package dev.gethealthy.app.controllers;

import dev.gethealthy.app.models.requests.CommentRequest;
import dev.gethealthy.app.models.responses.CommentResponse;
import dev.gethealthy.app.services.CommentService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${gethealthy.base-url}")
public class CommentController {
    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/training-programs/{programId}/comments")
    Page<CommentResponse> getTrainingProgramComments(@PathVariable(name = "programId") Integer programId, Pageable page) {
        return commentService.getAllTrainingProgramComments(programId, page);
    }

    @PostMapping("/training-programs/{programId}/comments")
    @ResponseStatus(HttpStatus.CREATED)
    public CommentResponse saveCommentOnTrainingProgram(@PathVariable(name = "programId") Integer programId,
                                                       @RequestBody @Valid CommentRequest request) {
        return commentService.saveCommentOnTrainingProgram(programId, request);
    }
}
