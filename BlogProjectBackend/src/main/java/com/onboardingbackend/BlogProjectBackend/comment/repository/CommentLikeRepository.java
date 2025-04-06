package com.onboardingbackend.BlogProjectBackend.comment.repository;

import com.onboardingbackend.BlogProjectBackend.board.entity.Board;
import com.onboardingbackend.BlogProjectBackend.board.entity.BoardLike;
import com.onboardingbackend.BlogProjectBackend.comment.entity.Comment;
import com.onboardingbackend.BlogProjectBackend.comment.entity.CommentLike;
import com.onboardingbackend.BlogProjectBackend.signup.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Integer> {
    Optional<CommentLike> findByCommentAndUser(Comment comment, UserEntity user);
}
