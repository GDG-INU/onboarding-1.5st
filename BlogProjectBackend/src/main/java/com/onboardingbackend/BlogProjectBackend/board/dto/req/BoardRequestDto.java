package com.onboardingbackend.BlogProjectBackend.board.dto.req;

import com.onboardingbackend.BlogProjectBackend.comment.dto.res.CommentResponseDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BoardRequestDto {
    private String title;
    private String content;
}
