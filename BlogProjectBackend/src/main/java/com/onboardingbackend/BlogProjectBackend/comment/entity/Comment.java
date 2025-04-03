package com.onboardingbackend.BlogProjectBackend.comment.entity;

import com.onboardingbackend.BlogProjectBackend.board.entity.Board;
import com.onboardingbackend.BlogProjectBackend.signup.entity.UserEntity;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Data
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String content;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Column(nullable = false)
    private Integer likeCount = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name= "user_id")
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id", nullable = false)
    private Board board;

    // 부모 댓글 (대댓글 기능에 사용)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_comment_id")
    private Comment parentComment;

    // 대댓글(자식 댓글) 리스트
    @OneToMany(mappedBy = "parentComment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> childComments = new ArrayList<>();


    // 댓글 내용 수정
    public void updateContent(String newContent) {
        this.content = newContent;
        this.updatedAt = LocalDateTime.now();
    }

    // 좋아요 증가
    public void increaseLike() {
        this.likeCount++;
    }
}
