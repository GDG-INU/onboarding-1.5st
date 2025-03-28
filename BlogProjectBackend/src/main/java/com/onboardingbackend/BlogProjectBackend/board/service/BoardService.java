package com.onboardingbackend.BlogProjectBackend.board.service;

import com.onboardingbackend.BlogProjectBackend.board.dto.req.BoardRequestDto;
import com.onboardingbackend.BlogProjectBackend.board.dto.res.BoardResponseDto;
import com.onboardingbackend.BlogProjectBackend.board.entity.Board;
import com.onboardingbackend.BlogProjectBackend.board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardService {

    private final BoardRepository boardRepository;

    // 글 작성
    public BoardResponseDto create(BoardRequestDto boardRequestDto) {
        Board board = new Board();
        board.setTitle(boardRequestDto.getTitle());
        board.setContent(boardRequestDto.getContent());
        board.setCreatedAt(LocalDateTime.now());
        board.setLikeCount(0);

        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        board.setAuthor(currentUsername);

        Board savedBoard = boardRepository.save(board);
        return new BoardResponseDto(savedBoard);
    }

    // 글 삭제
    public void delete(Integer id){
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시물이 없습니다."));
        boardRepository.delete(board);
    }

    // 글 수정
    public BoardResponseDto update(Integer id, BoardRequestDto boardRequestDto){
        Board board = boardRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("게시물이 없습니다."));
        board.update(boardRequestDto);
        return new BoardResponseDto(board);
    }

    // 작성자 확인
    @Transactional(readOnly = true)
    public boolean isAuthor(Integer id, String username){
        Board board = boardRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("게시물을 찾을 수 없습니다."));
        return board.getAuthor().equals(username);
    }
}


