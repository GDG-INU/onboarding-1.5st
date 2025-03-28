package com.onboardingbackend.BlogProjectBackend.board.dto.res;
import com.onboardingbackend.BlogProjectBackend.board.entity.Board;
import lombok.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class BoardResponseDto {
    private Integer id;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private Integer likeCount;
    private String author;

    public BoardResponseDto(Board board){
        this.id = board.getId();
        this.title = board.getTitle();
        this.content = board.getContent();
        this.createdAt = board.getCreatedAt();
        this.likeCount = board.getLikeCount();
        this.author = board.getAuthor();
    }

}
