package com.onboardingbackend.BlogProjectBackend.signup.config;

import com.onboardingbackend.BlogProjectBackend.signup.jwt.JWTFilter;
import com.onboardingbackend.BlogProjectBackend.signup.jwt.JWTUtil;
import com.onboardingbackend.BlogProjectBackend.signup.jwt.LoginFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final AuthenticationConfiguration authenticationConfiguration;
    private final JWTUtil jwtUtil;

    public SecurityConfig(AuthenticationConfiguration authenticationConfiguration,JWTUtil jwtUtil) {
        this.authenticationConfiguration = authenticationConfiguration;
        this.jwtUtil=jwtUtil;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        //csrf disable
        http
                .csrf((auth) ->auth.disable())
                .formLogin((auth) ->auth.disable())
                .httpBasic((auth) ->auth.disable()); //체이닝 적용

        http
                .authorizeHttpRequests((auth)->auth
                        .requestMatchers("/login","/","/join").permitAll()
                        .requestMatchers("/admin").hasRole("ADMIN")
                        .anyRequest().authenticated());

        http
                .addFilterBefore(new JWTFilter(jwtUtil),LoginFilter.class);
        http
                .addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration),jwtUtil), UsernamePasswordAuthenticationFilter.class);
        http
                .sessionManagement((session)-> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}
