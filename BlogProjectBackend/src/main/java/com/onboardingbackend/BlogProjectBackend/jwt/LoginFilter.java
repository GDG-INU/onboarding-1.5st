package com.onboardingbackend.BlogProjectBackend.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.onboardingbackend.BlogProjectBackend.dto.CustomerUserDetails;
import com.onboardingbackend.BlogProjectBackend.dto.LoginRequestDTO;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;


public class LoginFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;

    public LoginFilter(AuthenticationManager authenticationManager,JWTUtil jwtUtil){
        this.authenticationManager=authenticationManager;
        this.jwtUtil=jwtUtil;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        System.out.println("=== LoginFilter 진입 ===");
        //클라이언트 요청에서 username, password 추출
        ObjectMapper objectMapper = new ObjectMapper();
        LoginRequestDTO loginDTO = null;
        try {
            loginDTO = objectMapper.readValue(request.getInputStream(), LoginRequestDTO.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        String username = loginDTO.getUsername();
        String password = loginDTO.getPassword();

        System.out.println(username);


        //스프링 시큐리티에서 username과 password를 검증하기 위해서는 token에 담아야 함
        UsernamePasswordAuthenticationToken authToken= new UsernamePasswordAuthenticationToken(username,password,null);

        //token에 담은 검증을 위한 AuthenticationManager로 전달
        return authenticationManager.authenticate(authToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) {
        CustomerUserDetails customerUserDetails=(CustomerUserDetails) authentication.getPrincipal();

        String username=customerUserDetails.getUsername();

        Collection<? extends GrantedAuthority> authorities=authentication.getAuthorities();
        Iterator<? extends  GrantedAuthority> iterator=authorities.iterator();
        GrantedAuthority auth= iterator.next();

        String role=auth.getAuthority();

        String token=jwtUtil.createJwt(username,role,60*60*10L);

        response.addHeader("Authorization","Bearer "+ token);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {
        response.setStatus(401);
    }
}
