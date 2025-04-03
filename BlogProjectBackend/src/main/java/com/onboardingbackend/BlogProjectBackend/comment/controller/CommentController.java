package com.onboardingbackend.BlogProjectBackend.comment.controller;

import com.onboardingbackend.BlogProjectBackend.comment.dto.req.CommentRequestDto;
import com.onboardingbackend.BlogProjectBackend.comment.dto.res.CommentResponseDto;
import com.onboardingbackend.BlogProjectBackend.comment.service.CommentService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment")
public class CommentController {

    private final CommentService commentService;

    // 댓글 생성
    @PostMapping("/{boardId}")
    public ResponseEntity<CommentResponseDto> createComment(
            @PathVariable Integer boardId,
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody CommentRequestDto commentRequestDto) {
        CommentResponseDto createComment = commentService.create(boardId, userDetails, commentRequestDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(createComment);
    }

    // 댓글 삭제
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Boolean> deleteComment(
            @PathVariable Integer commentId){
        return ResponseEntity.status(HttpStatus.OK).body(commentService.delete(commentId));
    }

    //댓글 수정
    @PutMapping("/{commentId}")
    public ResponseEntity<CommentResponseDto> updateComment(
            @PathVariable Integer commentId,
            @RequestBody CommentRequestDto commentRequestDto){
        return ResponseEntity.status(HttpStatus.OK).body(commentService.update(commentId, commentRequestDto));
    }
}
