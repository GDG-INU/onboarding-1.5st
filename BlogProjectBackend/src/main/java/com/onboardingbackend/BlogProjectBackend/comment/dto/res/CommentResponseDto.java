package com.onboardingbackend.BlogProjectBackend.comment.dto.res;
import com.onboardingbackend.BlogProjectBackend.comment.entity.Comment;

import java.time.LocalDateTime;

public class CommentResponseDto {
    private Integer id;
    private String content;
    private LocalDateTime createdAt;
    private Integer likeCount;

    public CommentResponseDto(Comment comment){
        this.id = comment.getId();
        this.content = comment.getContent();
        this.createdAt = comment.getCreatedAt();
        this.likeCount = comment.getLikeCount();
    }
}
