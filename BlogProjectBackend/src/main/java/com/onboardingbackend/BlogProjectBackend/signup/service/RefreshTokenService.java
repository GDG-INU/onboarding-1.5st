package com.onboardingbackend.BlogProjectBackend.signup.service;

import com.onboardingbackend.BlogProjectBackend.signup.entity.RefreshToken;
import com.onboardingbackend.BlogProjectBackend.signup.repository.RefreshTokenRepository;
import com.onboardingbackend.BlogProjectBackend.signup.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository; // 유저 찾기용

    // yml에 정의된 만료시간 (예: 7일)
    @Value("${app.jwtRefreshExpirationMs}")
    private Long refreshTokenDurationMs;

    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository,
                               UserRepository userRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
    }

    public RefreshToken createorUpdateRefreshToken(Integer userId) {
        Optional<RefreshToken> existingToken = refreshTokenRepository.findByUserId(userId);

        RefreshToken refreshToken;
        if (existingToken.isPresent()) {
            // 2. 있으면 갱신
            refreshToken = existingToken.get();
            refreshToken.setToken(UUID.randomUUID().toString());
            refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
        } else {
            // 3. 없으면 새로 생성
            refreshToken = new RefreshToken();
            refreshToken.setUser(userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found")));
            refreshToken.setToken(UUID.randomUUID().toString());
            refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
        }
        return refreshTokenRepository.save(refreshToken);
    }

    /**
     * 토큰 문자열로 DB에서 찾기
     */
    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    /**
     * 토큰 만료 여부 확인
     * 만료되었으면 DB에서 삭제하고 예외 발생
     */
    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            // 이미 만료됨 → DB에서 삭제
            refreshTokenRepository.delete(token);
            throw new RuntimeException("Refresh token was expired. Please login again.");
        }
        return token;
    }

    /**
     * 로그아웃 등으로 Refresh Token 삭제
     */
    public int deleteByToken(String token) {
        return refreshTokenRepository.deleteByToken(token);
    }
}
