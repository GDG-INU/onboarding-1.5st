package com.onboardingbackend.BlogProjectBackend.board.dto.req;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardRequestDto {
    private String title;
    private String content;
}
