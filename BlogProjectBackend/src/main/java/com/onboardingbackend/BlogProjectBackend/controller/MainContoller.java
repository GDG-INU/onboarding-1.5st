package com.onboardingbackend.BlogProjectBackend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@ResponseBody
public class MainContoller {

    @GetMapping("/")
    public String mainP(){
        return "Main Controller";
    }
}
