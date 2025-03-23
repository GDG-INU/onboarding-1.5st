package com.onboardingbackend.BlogProjectBackend.signup.service;

import com.onboardingbackend.BlogProjectBackend.signup.dto.JoinDTO;
import com.onboardingbackend.BlogProjectBackend.signup.entity.UserEntity;
import com.onboardingbackend.BlogProjectBackend.signup.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JoinService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public JoinService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder){
        this.userRepository=userRepository;
        this.bCryptPasswordEncoder=bCryptPasswordEncoder;
    }

    public void joinProcess(JoinDTO joinDTO){

        String username=joinDTO.getUsername();
        String password=joinDTO.getPassword();

        Boolean isExist=userRepository.existsByUsername(username);

        if(isExist){
            throw new IllegalArgumentException("이미 존재하는 사용자입니다."); //의미상 예외 지정
        }
        UserEntity data=new UserEntity();
        data.setUsername(username);
        data.setPassword(bCryptPasswordEncoder.encode(password));
        data.setNickname(joinDTO.getNickname());  // 추가!
        data.setEmail(joinDTO.getEmail());        // 추가!
        data.setRole("ROLE_ADMIN");

        userRepository.save(data);
    }
}
