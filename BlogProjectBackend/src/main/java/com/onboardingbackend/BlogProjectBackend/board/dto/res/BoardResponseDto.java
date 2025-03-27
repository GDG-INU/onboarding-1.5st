package com.onboardingbackend.BlogProjectBackend.board.dto.res;
import com.onboardingbackend.BlogProjectBackend.board.entity.Board;
import lombok.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class BoardResponseDto {
    private final Integer id;
    private final String title;
    private final String content;
    private final LocalDateTime createdAt;
    private final Integer likeCount;

    public BoardResponseDto(Board board){
        this.id = board.getId();
        this.title = board.getTitle();
        this.content = board.getContent();
        this.createdAt = board.getCreatedAt();
        this.likeCount = board.getLikeCount();

    }


}
