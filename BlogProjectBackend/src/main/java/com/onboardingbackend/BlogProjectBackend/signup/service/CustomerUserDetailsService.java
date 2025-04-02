package com.onboardingbackend.BlogProjectBackend.signup.service;

import com.onboardingbackend.BlogProjectBackend.signup.dto.CustomerUserDetails;
import com.onboardingbackend.BlogProjectBackend.signup.entity.UserEntity;
import com.onboardingbackend.BlogProjectBackend.signup.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomerUserDetailsService(UserRepository userRepository){
        this.userRepository=userRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<UserEntity> userData=userRepository.findByEmail(email);

        if (userData == null) {
            throw new UsernameNotFoundException("유저를 찾을 수 없습니다.");
        }
        return new CustomerUserDetails(userData.get());
    }
}
