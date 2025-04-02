package com.onboardingbackend.BlogProjectBackend.board.service;

import com.onboardingbackend.BlogProjectBackend.board.dto.req.BoardRequestDto;
import com.onboardingbackend.BlogProjectBackend.board.dto.res.*;
import com.onboardingbackend.BlogProjectBackend.board.entity.Board;
import com.onboardingbackend.BlogProjectBackend.board.entity.BoardLike;
import com.onboardingbackend.BlogProjectBackend.board.entity.BoardTag;
import com.onboardingbackend.BlogProjectBackend.board.entity.Tag;
import com.onboardingbackend.BlogProjectBackend.board.repository.BoardLikeRepository;
import com.onboardingbackend.BlogProjectBackend.board.repository.BoardRepository;
import com.onboardingbackend.BlogProjectBackend.board.repository.BoardTagRepository;
import com.onboardingbackend.BlogProjectBackend.board.repository.TagRepository;
import com.onboardingbackend.BlogProjectBackend.signup.dto.CustomerUserDetails;
import com.onboardingbackend.BlogProjectBackend.signup.entity.UserEntity;
import com.onboardingbackend.BlogProjectBackend.signup.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardService {

    private final BoardRepository boardRepository;
    private final TagRepository tagRepository;
    private final BoardTagRepository boardTagRepository;
    private final UserRepository userRepository;
    private final BoardLikeRepository boardLikeRepository;

    // 게시글 작성
    public BoardResponseDto create(BoardRequestDto boardRequestDto, String email) {

        UserEntity user = Optional.ofNullable(userRepository.findByEmail(email))
                .orElseThrow(()->new IllegalArgumentException("찾을 수 없는 사용자"));

        Board board = new Board();
        board.setTitle(boardRequestDto.getTitle());
        board.setContent(boardRequestDto.getContent());
        board.setCreatedAt(LocalDateTime.now());
        board.setLikeCount(0);
        board.setUser(user);

        Board savedBoard = boardRepository.save(board);
        return new BoardResponseDto(savedBoard);
    }

    // 게시글 삭제
    public void delete(Integer id){
        boardRepository.deleteById(id);
    }

    // 게시글 수정
    public BoardResponseDto update(Integer id, BoardRequestDto boardRequestDto){
        Board board = boardRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("게시물이 없습니다."));
        board.update(boardRequestDto);
        return new BoardResponseDto(board);
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

        int currentPage = boardPage.getNumber() + 1;
        int totalPages = boardPage.getTotalPages();

        BoardPageResponseDto pageResponseDto = new BoardPageResponseDto();
        pageResponseDto.setCurrentPage(currentPage);
        pageResponseDto.setTotalPages(totalPages);

        BoardPagedResponseDto response = new BoardPagedResponseDto();
        response.setBoards(boards);
        response.setPage(pageResponseDto);
        return response;
    }

    // 조회 수 증가 로직
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
    public BoardResponseDto toggleLike(Integer id, CustomerUserDetails userDetails){
        Board board = boardRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("게시물을 찾을 수 없습니다."));

        UserEntity user = userRepository.findByEmail(userDetails.getEmail());
        if(user==null){
            throw new IllegalArgumentException("사용자를 찾을 수 없습니다.");
        }

        Optional<BoardLike> exsitLike = boardLikeRepository.findByBoardAndUser(board, user);
        if (exsitLike.isPresent()){
            boardLikeRepository.delete(exsitLike.get());
            board.setLikeCount(board.getLikeCount() -1 );
        } else {
            BoardLike boardLike = new BoardLike();
            boardLike.setBoard(board);
            boardLike.setUser(user);
            boardLikeRepository.save(boardLike);
            board.setLikeCount(board.getLikeCount() + 1 );
        }

        boardRepository.save(board);
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
        List<BoardTag> boardTags = boardTagRepository.findByTag_NameFetchBoard(tagName);
        return boardTags.stream()
                .map(boardTag -> new BoardListResponseDto(boardTag.getBoard()))
                .toList();
    }

}


