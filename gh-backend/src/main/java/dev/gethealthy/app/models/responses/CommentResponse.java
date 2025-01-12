package dev.gethealthy.app.models.responses;

import lombok.Data;

import java.time.Instant;
import java.util.Date;

@Data
public class CommentResponse {
    private Integer commentId;
    private String content;
    private Instant datePosted;
    private Integer authorId;
    private String authorFirstName;
    private String authorLastName;
    private String authorProfilePictureFilePath;
}
