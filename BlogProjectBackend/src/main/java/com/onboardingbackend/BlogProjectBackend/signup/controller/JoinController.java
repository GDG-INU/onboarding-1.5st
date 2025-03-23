package com.onboardingbackend.BlogProjectBackend.signup.controller;

import com.onboardingbackend.BlogProjectBackend.signup.dto.JoinDTO;
import com.onboardingbackend.BlogProjectBackend.signup.service.JoinService;
import lombok.extern.slf4j.Slf4j;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j   //System.out.println은 느림
@RestController  //RestController로 변경
public class JoinController {

    private  final JoinService joinService;

    private  JoinController(JoinService joinService){
        this.joinService=joinService;
    }

    @PostMapping("api/signup/join")
    public ResponseEntity<?> joinProcess(@RequestBody JoinDTO joinDTO){
        log.info("요청 데이터: {}", joinDTO);
        joinService.joinProcess(joinDTO);
        return new ResponseEntity<>("회원가입 완료", HttpStatus.CREATED);
    }
}
