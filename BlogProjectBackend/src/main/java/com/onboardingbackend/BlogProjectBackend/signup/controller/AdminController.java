package com.onboardingbackend.BlogProjectBackend.signup.controller;

import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController//RestController 적용

public class AdminController {

    @GetMapping("/admin")
    public String adminP(){
        return "Admin Controller";
    }
}
