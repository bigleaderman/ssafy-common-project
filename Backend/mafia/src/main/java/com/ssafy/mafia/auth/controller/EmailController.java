package com.ssafy.mafia.auth.controller;


import com.ssafy.mafia.auth.service.EmailService;
import com.ssafy.mafia.auth.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Api(tags = "이메일기능")
public class EmailController {

    private final EmailService emailService;

    private final UserService userService;

    @PostMapping("/sendEmail")
    @ApiOperation(value = "이메일전송", notes="인증 이메일을 네이버에서 전송 한다")
    public void sendEmail(@ApiParam(value = "회원이메일", example = "ssafy@naver.com") @RequestBody String email) throws Exception {
        emailService.sendEmail(email);
    }

    @GetMapping("/validationUser/{userId}/{num}")
    @ApiOperation(value = "유저 인증하기", notes = "받은 이메일을 통해서 유저 인증하기", response = boolean.class)
    public void validationUser(@PathVariable("userId") int userId,@PathVariable("num") int num) throws Exception {
        userService.validationUser(userId, num);
    }
}
