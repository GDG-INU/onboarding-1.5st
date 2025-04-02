package com.onboardingbackend.BlogProjectBackend.comment.service;

import com.onboardingbackend.BlogProjectBackend.board.entity.Board;
import com.onboardingbackend.BlogProjectBackend.board.repository.BoardRepository;
import com.onboardingbackend.BlogProjectBackend.comment.dto.req.CommentRequestDto;
import com.onboardingbackend.BlogProjectBackend.comment.dto.res.CommentResponseDto;
import com.onboardingbackend.BlogProjectBackend.comment.entity.Comment;
import com.onboardingbackend.BlogProjectBackend.comment.repository.CommentRepository;
import com.onboardingbackend.BlogProjectBackend.signup.entity.UserEntity;
import com.onboardingbackend.BlogProjectBackend.signup.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Transactional
@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    // 댓글 작성
    public CommentResponseDto create(Integer boardId, UserDetails userDetails, CommentRequestDto commentRequestDto){
        Board board = boardRepository.findById(boardId)
                .orElseThrow(()-> new IllegalArgumentException("해당 게시판이 존재하지 않습니다."));
        UserEntity user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(()-> new UsernameNotFoundException("해당 사용자를 찾을 수 없습니다."));

        Comment comment = new Comment();
        comment.setContent(commentRequestDto.getContent());
        comment.setCreatedAt(LocalDateTime.now());
        comment.setLikeCount(0);
        comment.setBoard(board);
        comment.setUser(user);

        Comment savedComment = commentRepository.save(comment);
        return new CommentResponseDto(savedComment);
    }

    // 댓글 삭제
    public Boolean delete(Integer id, UserDetails userDetails){
        Comment comment = commentRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("댓글을 찾을 수 없습니다."));
        commentRepository.delete(comment);
        return true;
    }

}
