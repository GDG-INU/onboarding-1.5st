package com.onboardingbackend.BlogProjectBackend.signup.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.onboardingbackend.BlogProjectBackend.signup.dto.CustomerUserDetails;
import com.onboardingbackend.BlogProjectBackend.signup.dto.LoginRequestDTO;
import com.onboardingbackend.BlogProjectBackend.signup.entity.RefreshToken;
import com.onboardingbackend.BlogProjectBackend.signup.service.RefreshTokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

@Slf4j
public class LoginFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final RefreshTokenService refreshTokenService;

    public LoginFilter(AuthenticationManager authenticationManager,JWTUtil jwtUtil,RefreshTokenService refreshTokenService){
          this.authenticationManager=authenticationManager;
          this.jwtUtil=jwtUtil;
          this.refreshTokenService=refreshTokenService;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        log.info("=== LoginFilter 진입 ===");
        //클라이언트 요청에서 username, password 추출
        ObjectMapper objectMapper = new ObjectMapper();
        LoginRequestDTO loginDTO = null;
        try {
            loginDTO = objectMapper.readValue(request.getInputStream(), LoginRequestDTO.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        String email = loginDTO.getEmail();
        String password = loginDTO.getPassword();

        log.info(email);


        //스프링 시큐리티에서 username과 password를 검증하기 위해서는 token에 담아야 함
        UsernamePasswordAuthenticationToken authToken= new UsernamePasswordAuthenticationToken(email,password,null);

        //token에 담은 검증을 위한 AuthenticationManager로 전달
        return authenticationManager.authenticate(authToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException {
        CustomerUserDetails customerUserDetails=(CustomerUserDetails) authentication.getPrincipal();

        String email=customerUserDetails.getEmail();
        Integer userID= customerUserDetails.getUserID();

        Collection<? extends GrantedAuthority> authorities=authentication.getAuthorities();
        Iterator<? extends  GrantedAuthority> iterator=authorities.iterator();
        GrantedAuthority auth= iterator.next();

        String role=auth.getAuthority();

        String accessToken=jwtUtil.createJwt(email,role,60*60*1000L);
        RefreshToken refreshToken = refreshTokenService.createorUpdateRefreshToken(userID);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // (2) JSON으로 내려줄 데이터 구성
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("accessToken", accessToken);
        responseBody.put("refreshToken", refreshToken.getToken());
        responseBody.put("email", email);
        responseBody.put("nickname", customerUserDetails.getNickname()); // CustomerUserDetails 안에 getNickname()이 있어야 함
        responseBody.put("message", "로그인에 성공했습니다.");

        // (3) JSON 변환 후 응답에 쓰기
        new ObjectMapper().writeValue(response.getWriter(), responseBody); //필터안에서 JSON을 내려준다

    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // 응답 내용 구성
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("error", "이메일 또는 비밀번호가 일치하지 않습니다.");
        errorResponse.put("status", 401);

        // 응답 JSON 출력
        new ObjectMapper().writeValue(response.getWriter(), errorResponse);
    }
}
