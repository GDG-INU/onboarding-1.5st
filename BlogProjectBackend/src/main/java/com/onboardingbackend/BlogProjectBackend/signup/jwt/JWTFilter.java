package com.onboardingbackend.BlogProjectBackend.signup.jwt;

import com.onboardingbackend.BlogProjectBackend.signup.dto.CustomerUserDetails;
import com.onboardingbackend.BlogProjectBackend.signup.entity.UserEntity;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JWTFilter extends OncePerRequestFilter {
    private final JWTUtil jwtUtil;

    public JWTFilter(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String authorization=request.getHeader("Authorization");
        if(authorization ==null || !authorization.startsWith("Bearer ")){
            System.out.println("token null");
            filterChain.doFilter(request,response);

            return;
        }

        String token=authorization.split(" ")[1];

        if(jwtUtil.isExpired(token)){
            System.out.println("token expired");
            filterChain.doFilter(request,response);

            return;
        }

        String email=jwtUtil.getEmail(token);
        String role=jwtUtil.getRole(token);

        UserEntity userEntity=new UserEntity();
        userEntity.setEmail(email);
        userEntity.setUsername(email);
        userEntity.setPassword("temppassword");
        userEntity.setRole(role);

        CustomerUserDetails customerUserDetails=new CustomerUserDetails(userEntity);

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(customerUserDetails, null, customerUserDetails.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }
}
