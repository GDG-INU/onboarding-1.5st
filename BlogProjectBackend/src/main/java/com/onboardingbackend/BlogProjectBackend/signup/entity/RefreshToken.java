package com.onboardingbackend.BlogProjectBackend.signup.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.repository.cdi.Eager;

import java.time.Instant;

@Entity
@Getter
@Setter

public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserEntity user;

    // 실제 리프레시 토큰 문자열
    @Column(nullable = false, unique = true)
    private String token;

    // 만료 일시(Instant 또는 LocalDateTime 등)
    @Column(nullable = false)
    private Instant expiryDate;

    // 기본 생성자, 게터, 세터
    public RefreshToken() {
    }
}
