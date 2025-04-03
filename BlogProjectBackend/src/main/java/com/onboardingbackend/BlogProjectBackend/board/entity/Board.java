package com.onboardingbackend.BlogProjectBackend.board.entity;
import com.onboardingbackend.BlogProjectBackend.board.dto.req.BoardRequestDto;
import com.onboardingbackend.BlogProjectBackend.comment.entity.Comment;
import com.onboardingbackend.BlogProjectBackend.signup.entity.UserEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@BatchSize(size = 100)
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;
    private String content;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Column(nullable = false)
    private Integer likeCount = 0;

    @Column(nullable = false)
    private Integer viewCount = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name= "user_id")
    private UserEntity user;

    @Version
    private Integer version;

    // 댓글 리스트 (양방향 매핑)
    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    public void update(BoardRequestDto boardRequestDto){
        this.title = boardRequestDto.getTitle();
        this.content = boardRequestDto.getContent();
    }

    public boolean isAuthor(String email){
        return this.user != null && this.user.getEmail().equals(email); // email로 user인지 판단(기존:username)
    }
}
