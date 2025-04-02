package com.onboardingbackend.BlogProjectBackend.board.entity;
import com.onboardingbackend.BlogProjectBackend.board.dto.req.BoardRequestDto;
import com.onboardingbackend.BlogProjectBackend.signup.entity.UserEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.lang.reflect.Member;
import java.time.LocalDateTime;

@Entity
@Data
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

    public void update(BoardRequestDto boardRequestDto){
        this.title = boardRequestDto.getTitle();
        this.content = boardRequestDto.getContent();
    }
}
