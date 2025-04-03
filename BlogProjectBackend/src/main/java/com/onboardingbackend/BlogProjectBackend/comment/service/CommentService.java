package com.onboardingbackend.BlogProjectBackend.comment.service;

import com.onboardingbackend.BlogProjectBackend.board.entity.Board;
import com.onboardingbackend.BlogProjectBackend.board.repository.BoardRepository;
import com.onboardingbackend.BlogProjectBackend.comment.dto.req.CommentRequestDto;
import com.onboardingbackend.BlogProjectBackend.comment.dto.res.CommentResponseDto;
import com.onboardingbackend.BlogProjectBackend.comment.entity.Comment;
import com.onboardingbackend.BlogProjectBackend.comment.repository.CommentRepository;
import com.onboardingbackend.BlogProjectBackend.signup.entity.UserEntity;
import com.onboardingbackend.BlogProjectBackend.signup.repository.UserRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.stream.Collectors;

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

        Comment parent = null;
        if (commentRequestDto.getParentCommentId() != null) {
            parent = commentRepository.findById(commentRequestDto.getParentCommentId())
                    .orElseThrow(() -> new IllegalArgumentException("부모 댓글 없음"));
        }

        Comment comment = new Comment();
        comment.setContent(commentRequestDto.getContent());
        comment.setUpdatedAt(LocalDateTime.now());
        comment.setCreatedAt(LocalDateTime.now());
        comment.setLikeCount(0);
        comment.setBoard(board);
        comment.setUser(user);
        comment.setParentComment(parent);

        Comment savedComment = commentRepository.save(comment);

        return CommentResponseDto.of(savedComment);
    }

    // 댓글 삭제
    public Boolean delete(Integer id){
        Comment comment = commentRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("댓글을 찾을 수 없습니다."));
        commentRepository.delete(comment);
        return true;
    }

    //댓글 수정
    public CommentResponseDto update(Integer commentId, CommentRequestDto commentRequestDto) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("해당 댓글이 존재하지 않습니다."));
        comment.updateContent(commentRequestDto.getContent());

        return CommentResponseDto.of(comment);
    }

    //댓글 좋아요
    public CommentResponseDto likeComment(Integer commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("해당 댓글이 존재하지 않습니다."));
        comment.increaseLike();
        return CommentResponseDto.of(comment);
    }


}
