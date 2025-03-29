package com.onboardingbackend.BlogProjectBackend.board.service;

import com.onboardingbackend.BlogProjectBackend.board.dto.req.BoardRequestDto;
import com.onboardingbackend.BlogProjectBackend.board.dto.res.*;
import com.onboardingbackend.BlogProjectBackend.board.entity.Board;
import com.onboardingbackend.BlogProjectBackend.board.entity.BoardTag;
import com.onboardingbackend.BlogProjectBackend.board.entity.Tag;
import com.onboardingbackend.BlogProjectBackend.board.repository.BoardRepository;
import com.onboardingbackend.BlogProjectBackend.board.repository.BoardTagRepository;
import com.onboardingbackend.BlogProjectBackend.board.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardService {

    private final BoardRepository boardRepository;
    private final TagRepository tagRepository;
    private final BoardTagRepository boardTagRepository;

    // 게시글 작성
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

    // 게시글 삭제
    public void delete(Integer id){
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시물이 없습니다."));
        boardRepository.delete(board);
    }

    // 게시글 수정
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

    // 게시글 목록 조회
    @Transactional(readOnly = true)
    public BoardPagedResponseDto findBoardPage(int page, int size){
        // 생성일 기준 내림차순 정렬
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Board> boardPage = boardRepository.findAll(pageable);

        List<BoardListResponseDto> boards = boardPage.stream()
                .map(BoardListResponseDto::new)
                .toList();

        int blockSize = 5;
        int currentPage = boardPage.getNumber() + 1;
        int totalPages = boardPage.getTotalPages();
        int startPage = ((currentPage - 1) / blockSize) * blockSize + 1;
        int endPage = Math.min(startPage + blockSize - 1, totalPages);

        BoardPageResponseDto pageResponseDto = new BoardPageResponseDto();
        pageResponseDto.setCurrentPage(currentPage);
        pageResponseDto.setTotalPages(totalPages);
        pageResponseDto.setEndPage(endPage);

        BoardPagedResponseDto response = new BoardPagedResponseDto();
        response.setBoards(boards);
        response.setPage(pageResponseDto);
        return response;
    }

    // 조회 수 증가 로직
    @Transactional
    public void updateViewCount(Integer id){
        boardRepository.incrementViewCount(id);
    }

    // 게시글 상세 조회
    @Transactional(readOnly = true)
    public BoardDetailResponseDto findById(Integer id){
        Board board = boardRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("게시물을 찾을 수 없습니다."));
        return new BoardDetailResponseDto(board);
    }

    // 좋아요 토글
    @Transactional
    public BoardResponseDto toggleLike(Integer id){
        Board board = boardRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("게시물을 찾을 수 없습니다."));
        if(board.getLikeCount() == 0){
            board.setLikeCount(1);
        } else {
            board.setLikeCount(0);
        }
        return new BoardResponseDto(board);
    }

    // 게시글에 태그 추가
    public void addTag(Integer id, List<String> tagNames){
        Board board = boardRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("게시물을 찾을 수 없습니다."));
        for (String tagName : tagNames){
            Tag tag = tagRepository.findByName(tagName)
                    .orElseGet(()->tagRepository.save(Tag.builder().name(tagName).build()));
            BoardTag boardTag = BoardTag.builder()
                    .board(board)
                    .tag(tag)
                    .build();
            boardTagRepository.save(boardTag);
        }
    }

    // 태그로 게시글 조회
    @Transactional(readOnly = true)
    public List<BoardListResponseDto> getBoardsByTag(String tagName){
        List<BoardTag> boardTags = boardTagRepository.findByTag_Name(tagName);
        return boardTags.stream()
                .map(boardTag -> new BoardListResponseDto(boardTag.getBoard()))
                .toList();
    }

}


