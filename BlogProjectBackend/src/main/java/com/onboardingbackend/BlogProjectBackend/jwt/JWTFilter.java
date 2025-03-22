package com.onboardingbackend.BlogProjectBackend.jwt;

import com.onboardingbackend.BlogProjectBackend.dto.CustomerUserDetails;
import com.onboardingbackend.BlogProjectBackend.entity.UserEntity;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
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

        String username=jwtUtil.getUsername(token);
        String role=jwtUtil.getRole(token);

        UserEntity userEntity=new UserEntity();
        userEntity.setUsername(username);
        userEntity.setPassword("temppassword");
        userEntity.setRole(role);

        CustomerUserDetails customerUserDetails=new CustomerUserDetails(userEntity);

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(customerUserDetails, null, customerUserDetails.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }
}
