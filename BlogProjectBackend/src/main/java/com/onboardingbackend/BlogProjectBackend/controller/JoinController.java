package com.onboardingbackend.BlogProjectBackend.controller;

import com.onboardingbackend.BlogProjectBackend.dto.JoinDTO;
import com.onboardingbackend.BlogProjectBackend.service.JoinService;
import org.hibernate.mapping.Join;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@ResponseBody
public class JoinController {

    private  final JoinService joinService;

    private  JoinController(JoinService joinService){
        this.joinService=joinService;
    }

    @PostMapping("/join")
    public String joinProcess(@RequestBody JoinDTO joinDTO){
        System.out.println("요청 데이터: " + joinDTO);
        joinService.joinProcess(joinDTO);
        return "ok";
    }
}
