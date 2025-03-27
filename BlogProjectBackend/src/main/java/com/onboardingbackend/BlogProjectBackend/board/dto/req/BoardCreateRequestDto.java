package com.onboardingbackend.BlogProjectBackend.board.dto.req;

import com.onboardingbackend.BlogProjectBackend.board.entity.Board;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

import java.util.List;

@Getter
public class BoardCreateRequestDto {
    @NotBlank(message = "제목을 입력하세요")
    private String title;

    @NotBlank(message = "내용을 입력하세요")
    private String content;

    private List<String> tags;

    public Board toEntity(){
        return Board.builder()
                .title(this.title)
                .content(this.content)
                .tags(this.tags)
                .build();
    }

}
