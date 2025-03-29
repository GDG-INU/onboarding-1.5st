package com.onboardingbackend.BlogProjectBackend.board.dto.res;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BoardPageResponseDto {
    private int currentPage; // 현재 페이지

    private int totalPages; // 전체 필요한 페이지 갯수

    private int startPage; // 현재 페이지 기준

    private int endPage;
}
