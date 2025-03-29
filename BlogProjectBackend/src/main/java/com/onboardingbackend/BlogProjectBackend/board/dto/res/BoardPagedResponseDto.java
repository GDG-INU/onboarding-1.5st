package com.onboardingbackend.BlogProjectBackend.board.dto.res;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class BoardPagedResponseDto {

    private List<BoardListResponseDto> boards;
    private BoardPageResponseDto page;
}
