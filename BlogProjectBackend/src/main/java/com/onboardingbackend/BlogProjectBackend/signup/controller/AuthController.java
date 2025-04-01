package com.onboardingbackend.BlogProjectBackend.signup.controller;

import com.onboardingbackend.BlogProjectBackend.signup.entity.UserEntity;
import com.onboardingbackend.BlogProjectBackend.signup.jwt.JWTUtil;
import com.onboardingbackend.BlogProjectBackend.signup.service.RefreshTokenService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final RefreshTokenService refreshTokenService;
    private final JWTUtil jwtUtil; // Access Token 발급용

    public AuthController(RefreshTokenService refreshTokenService, JWTUtil jwtUtil) {
        this.refreshTokenService = refreshTokenService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshtoken(@RequestBody Map<String, String> request) {
        // 요청 바디에 { "refreshToken": "xxxxxx" } 이런 식으로 보낸다고 가정
        String requestRefreshToken = request.get("refreshToken");

        // Refresh Token 값이 없으면 400 Bad Request
        if (requestRefreshToken == null || requestRefreshToken.trim().isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Refresh token is required");
            return ResponseEntity.badRequest().body(error);
        }

        // 1) DB에서 Refresh Token 조회
        // 2) 만료 여부(verifyExpiration) 검증
        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                // 3) 검증 통과하면 user 정보 꺼내서 새 Access Token 발급
                .map(refreshToken -> {
                    UserEntity user = refreshToken.getUser();
                    String username = user.getUsername();
                    String role = user.getRole();

                    // 새로운 Access Token 생성
                    String newAccessToken = jwtUtil.createJwt(username, role, 60 * 60 * 10L);
                    // ↑ (10시간 예시)

                    // 🔸 필요하다면 Refresh Token도 재발급 & DB 업데이트
                    // RefreshToken newRefreshToken = refreshTokenService.createRefreshToken(user.getId());
                    // refreshTokenRepository.save(newRefreshToken);

                    // 우선은 기존 Refresh Token 그대로 쓴다고 가정
                    return ResponseEntity.ok(
                            Map.of(
                                    "accessToken", newAccessToken,
                                    "refreshToken", requestRefreshToken
                            )
                    );
                })
                // 4) DB에 없거나 만료되었다면 예외 발생
                .orElseThrow(() -> new RuntimeException("Refresh token not found in database!"));
    }
}
