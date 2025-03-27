package com.onboardingbackend.BlogProjectBackend.board.controller;

import com.onboardingbackend.BlogProjectBackend.board.dto.res.BoardResponseDto;
import com.onboardingbackend.BlogProjectBackend.board.entity.Board;
import com.onboardingbackend.BlogProjectBackend.board.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class BoardController {

    @Autowired
    private BoardService boardService;

    // 글 작성
    @PostMapping("/api/board")
    public ResponseEntity<BoardResponseDto> createdBoard(@RequestBody Board board) {
        boardService.create(board); // Board 저장
        BoardResponseDto response = new BoardResponseDto("Success"); // 응답 객체 생성
        return ResponseEntity.status(HttpStatus.CREATED).body(response); // 응답 반환
    }




}
