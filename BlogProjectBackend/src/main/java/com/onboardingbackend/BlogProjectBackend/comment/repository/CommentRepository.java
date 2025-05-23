package com.onboardingbackend.BlogProjectBackend.comment.repository;

import com.onboardingbackend.BlogProjectBackend.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    List<Comment> findByBoard_IdAndParentCommentIsNull(Integer boardId);
}
