package com.onboardingbackend.BlogProjectBackend.service;

import com.onboardingbackend.BlogProjectBackend.dto.CustomerUserDetails;
import com.onboardingbackend.BlogProjectBackend.entity.UserEntity;
import com.onboardingbackend.BlogProjectBackend.repository.UserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomerUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomerUserDetailsService(UserRepository userRepository){
        this.userRepository=userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userData=userRepository.findByUsername(username);

        if(userData!=null){
            return new CustomerUserDetails(userData);
        }
        return null;
    }
}
