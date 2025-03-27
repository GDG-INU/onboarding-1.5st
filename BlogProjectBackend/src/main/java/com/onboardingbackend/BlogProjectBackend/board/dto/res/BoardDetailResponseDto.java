package com.onboardingbackend.BlogProjectBackend.board.dto.res;

import com.onboardingbackend.BlogProjectBackend.board.entity.Board;
import lombok.*;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BoardDetailResponseDto {
    private String nickname;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer likeCount;
    private Integer viewCount;

    public BoardDetailResponseDto(Board board){
        this.nickname = board.getMember().getNickname();
        this.title = board.getTitle();
        this.content = board.getContent();
        this.createdAt = board.getCreatedAt();
        this.updatedAt = board.getUpdatedAt();
        this.likeCount = board.getLikeCount();
        this.viewCount = board.getViewCount();
    }
}
