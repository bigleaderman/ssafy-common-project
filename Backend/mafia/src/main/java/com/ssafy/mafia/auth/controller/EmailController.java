package com.ssafy.mafia.auth.controller;


import com.ssafy.mafia.auth.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;


    @PostMapping("user/sendEmail")
    public void sendEmail() {
        emailService.sendEmail();
    }
}
