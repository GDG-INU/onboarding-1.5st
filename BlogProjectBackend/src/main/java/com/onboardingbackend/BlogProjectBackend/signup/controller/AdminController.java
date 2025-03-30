package com.onboardingbackend.BlogProjectBackend.signup.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;


@RestController//RestController 적용

public class AdminController {

    @GetMapping("/admin")
    public ResponseEntity<Map<String, String>> adminP(){
        Map<String, String> message = new HashMap<>();
        message.put("message", "Admin_Controll");
        return ResponseEntity.ok(message);
    }
}
