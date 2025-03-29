package com.onboardingbackend.BlogProjectBackend.board.dto.res;

import com.onboardingbackend.BlogProjectBackend.board.entity.Board;
import lombok.*;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class BoardListResponseDto {

    private final Integer id;
    private final String title;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    public BoardListResponseDto(Board board){
        this.id = board.getId();
        this.title = board.getTitle();
        this.createdAt = board.getCreatedAt();
        this.updatedAt = board.getUpdatedAt();
    }

}
