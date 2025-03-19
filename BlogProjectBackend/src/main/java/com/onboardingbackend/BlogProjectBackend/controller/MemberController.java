package com.onboardingbackend.BlogProjectBackend.controller;

import com.onboardingbackend.BlogProjectBackend.dto.MemberDTO;
import com.onboardingbackend.BlogProjectBackend.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/member/save")
    public String showSavePage() {
        return "save"; // templates/save.html을 렌더링
    }

    @PostMapping("/member/save")
    public String save(@ModelAttribute MemberDTO memberDTO){
        System.out.println("MemberController.save");
        System.out.println("memberDTO= "+memberDTO);
        memberService.save(memberDTO);
        return "index";
    }
}
