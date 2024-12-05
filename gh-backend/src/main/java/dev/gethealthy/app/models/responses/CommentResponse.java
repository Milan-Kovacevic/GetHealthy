package dev.gethealthy.app.models.responses;

import lombok.Data;

import java.util.Date;

@Data
public class CommentResponse {
    private Integer commentId;
    private String content;
    private Date datePosted;
    private Integer authorId;
    private String authorFirstName;
    private String authorLastName;
}
