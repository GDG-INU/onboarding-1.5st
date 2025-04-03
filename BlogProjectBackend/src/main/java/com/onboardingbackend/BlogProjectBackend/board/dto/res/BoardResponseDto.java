package com.onboardingbackend.BlogProjectBackend.board.dto.res;
import com.onboardingbackend.BlogProjectBackend.board.entity.Board;
import com.onboardingbackend.BlogProjectBackend.comment.dto.res.CommentResponseDto;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor //이거 굳이 필요없을듯?
public class BoardResponseDto {
    private Integer id;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private Integer likeCount;

    public BoardResponseDto(Board board){
        this.id = board.getId();
        this.title = board.getTitle();
        this.content = board.getContent();
        this.createdAt = board.getCreatedAt();
        this.likeCount = board.getLikeCount();

    }
    // 게시글 조회 시 댓글 트리까지 함께 반환
    private List<CommentResponseDto> comments;

}
