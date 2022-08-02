package com.ssafy.mafia.auth.controller;


import com.ssafy.mafia.auth.service.EmailService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Api(tags = "이메일기능")
public class EmailController {

    private final EmailService emailService;


    @PostMapping("/sendEmail")
    @ApiOperation(value = "이메일전송", notes="인증 이메일을 네이버에서 전송 한다")
    public void sendEmail(@ApiParam(value = "회원이메일", example = "ssafy@naver.com") @RequestBody String email) throws Exception {
        emailService.sendEmail(email);
    }
}
