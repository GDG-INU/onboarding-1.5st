package com.onboardingbackend.BlogProjectBackend.board.dto.res;

import com.onboardingbackend.BlogProjectBackend.board.entity.Board;
import com.onboardingbackend.BlogProjectBackend.comment.dto.res.CommentResponseDto;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BoardDetailResponseDto {
    private Integer id;
    private String nickname;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer likeCount;
    private Integer viewCount;
    private List<CommentResponseDto> comments; // 댓글 트리

    public BoardDetailResponseDto(Board board){
        this.id=board.getId();
        this.nickname = board.getUser() != null ? board.getUser().getNickname() : null;
        this.title = board.getTitle();
        this.content = board.getContent();
        this.createdAt = board.getCreatedAt();
        this.updatedAt = board.getUpdatedAt();
        this.likeCount = board.getLikeCount();
        this.viewCount = board.getViewCount();
        this.comments=board.getComments().stream()
                .filter(comment -> comment.getParentComment() == null) // 최상위 댓글만
                .map(CommentResponseDto::ofWithChildren)
                .toList();
    }
}
