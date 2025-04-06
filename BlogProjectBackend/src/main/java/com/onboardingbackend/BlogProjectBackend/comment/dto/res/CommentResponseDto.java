package com.onboardingbackend.BlogProjectBackend.comment.dto.res;
import com.onboardingbackend.BlogProjectBackend.comment.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
@Builder
public class CommentResponseDto {
    private Integer id;
    private String content;
    private Integer boardId;
    private Integer parentCommentId;
    private Integer likeCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private List<CommentResponseDto> childComments; // 대댓글 트리

    public static CommentResponseDto ofWithChildren(Comment comment) {
        return CommentResponseDto.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .boardId(comment.getBoard().getId())
                .parentCommentId(comment.getParentComment() != null ? comment.getParentComment().getId() : null)
                .likeCount(comment.getLikeCount())
                .createdAt(comment.getCreatedAt())
                .updatedAt(comment.getUpdatedAt())
                .childComments(
                        comment.getChildComments().stream()
                                .map(CommentResponseDto::ofWithChildren) // 자식 댓글도 재귀 변환
                                .toList()
                )
                .build();
    }


    public static CommentResponseDto of(Comment comment) {
        return CommentResponseDto.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .boardId(comment.getBoard().getId())
                .parentCommentId(comment.getParentComment() != null ? comment.getParentComment().getId() : null)
                .likeCount(comment.getLikeCount())
                .createdAt(comment.getCreatedAt())
                .updatedAt(comment.getUpdatedAt())
                .build();
    }

}
