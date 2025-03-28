package com.onboardingbackend.BlogProjectBackend.board.service;

import com.onboardingbackend.BlogProjectBackend.board.dto.req.BoardRequestDto;
import com.onboardingbackend.BlogProjectBackend.board.dto.res.BoardResponseDto;
import com.onboardingbackend.BlogProjectBackend.board.entity.Board;
import com.onboardingbackend.BlogProjectBackend.board.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class BoardService {

    private final BoardRepository boardRepository;

    public BoardService(BoardRepository boardRepository){
        this.boardRepository = boardRepository;
    }

    public BoardResponseDto create(BoardRequestDto boardRequestDto) {
        Board board = new Board();
        board.setTitle(boardRequestDto.getTitle());
        board.setContent(boardRequestDto.getContent());
        board.setCreatedAt(LocalDateTime.now());
        board.setLikeCount(0);

        Board savedBoard = boardRepository.save(board);

        return new BoardResponseDto(savedBoard);
    }

    public void delete(Integer id){
        boardRepository.deleteById(id);
    }
}


