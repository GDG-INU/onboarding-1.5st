package com.onboardingbackend.BlogProjectBackend.board.controller;

import com.onboardingbackend.BlogProjectBackend.board.dto.req.BoardRequestDto;
import com.onboardingbackend.BlogProjectBackend.board.dto.res.BoardListResponseDto;
import com.onboardingbackend.BlogProjectBackend.board.dto.res.BoardPagedResponseDto;
import com.onboardingbackend.BlogProjectBackend.board.dto.res.BoardResponseDto;
import com.onboardingbackend.BlogProjectBackend.board.entity.Board;
import com.onboardingbackend.BlogProjectBackend.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class BoardController {

    private final BoardService boardService;

    // 인증된 사용자만 접근 가능
    // 글 작성
    @PostMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<BoardResponseDto> createBoard(@RequestBody BoardRequestDto boardRequestDto) {
        BoardResponseDto response = boardService.create(boardRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // 글 삭제
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @boardService.isAuthor(#id, authentication.principal.username)")
    public ResponseEntity<Void> deleteBoard(@PathVariable Integer id){
        boardService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // 글 수정
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @boardService.isAuthor(#id, authentication.principal.username)")
    public ResponseEntity<BoardResponseDto> updateBoard(@PathVariable Integer id, @RequestBody BoardRequestDto boardRequestDto){
        BoardResponseDto response = boardService.update(id, boardRequestDto);
        return ResponseEntity.ok(response);
    }

    // 글 전체 목록 조회
    @GetMapping("/{id}")
    public ResponseEntity<BoardPagedResponseDto> getBoardPage(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size){
        BoardPagedResponseDto response= boardService.findBoardPage(page, size);
        return ResponseEntity.ok(response);
    }

}
