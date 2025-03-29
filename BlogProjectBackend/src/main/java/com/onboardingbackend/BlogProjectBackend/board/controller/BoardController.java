package com.onboardingbackend.BlogProjectBackend.board.controller;

import com.onboardingbackend.BlogProjectBackend.board.dto.req.BoardRequestDto;
import com.onboardingbackend.BlogProjectBackend.board.dto.res.BoardDetailResponseDto;
import com.onboardingbackend.BlogProjectBackend.board.dto.res.BoardListResponseDto;
import com.onboardingbackend.BlogProjectBackend.board.dto.res.BoardPagedResponseDto;
import com.onboardingbackend.BlogProjectBackend.board.dto.res.BoardResponseDto;
import com.onboardingbackend.BlogProjectBackend.board.entity.Board;
import com.onboardingbackend.BlogProjectBackend.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class BoardController {

    private final BoardService boardService;

    // 인증된 사용자만 접근 가능
    // 게시글 작성
    @PostMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<BoardResponseDto> createBoard(@RequestBody BoardRequestDto boardRequestDto) {
        // 컨트롤러에서 인증 정보를 가져와 서비스로 전달
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();

        BoardResponseDto createdBoard = boardService.create(boardRequestDto, currentUsername);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBoard);
    }

    // 게시글 삭제
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Void> deleteBoard(@PathVariable Integer id){
        boardService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // 게시글 수정
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<BoardResponseDto> updateBoard(@PathVariable Integer id, @RequestBody BoardRequestDto boardRequestDto){
        BoardResponseDto response = boardService.update(id, boardRequestDto);
        return ResponseEntity.ok(response);
    }

    // 게시글 전체 목록 조회
    @GetMapping("/{id}")
    public ResponseEntity<BoardPagedResponseDto> getBoardPage(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size){
        BoardPagedResponseDto response= boardService.findBoardPage(page, size);
        return ResponseEntity.ok(response);
    }

    // 게시글 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<BoardDetailResponseDto> getBoard(@PathVariable Integer id){
        boardService.updateViewCount(id);
        BoardDetailResponseDto response = boardService.findById(id);
        return ResponseEntity.ok(response);
    }

    // 좋아요 토글
    @PostMapping("/{id}/like")
    public ResponseEntity<BoardResponseDto> toggleLike(@PathVariable Integer id){
        BoardResponseDto reponse = boardService.toggleLike(id);
        return ResponseEntity.ok(reponse);
    }

    // 게시글에 태그 추가
    @PostMapping("/{id}/tags")
    public ResponseEntity<Void> addTag(@PathVariable Integer id, @RequestBody List<String> tagNames){
        boardService.addTag(id, tagNames);
        return ResponseEntity.ok().build();
    }

    // 태그별 게시글 조회
    @GetMapping("/tags")
    public ResponseEntity<List<BoardListResponseDto>> getBoardsByTag(@RequestParam String name){
        List<BoardListResponseDto> result = boardService.getBoardsByTag(name);
        return ResponseEntity.ok(result);
    }

}
