package com.ssafy.mafia.auth.controller;


import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.auth.controller.dto.UserResponseDto;
import com.ssafy.mafia.auth.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    // 자신의 회원 정보 조회
    @GetMapping("/user/me")
    public ResponseEntity<User> getMyUserInfo() {
        return ResponseEntity.ok(userService.getMyInfo());
    }

    //유저 상세 조회 filter 기능
    @GetMapping("/admin/{email}")
    public ResponseEntity<User> getUSerInfo(@PathVariable String email) {
        return ResponseEntity.ok(userService.getUserInfo(email));
    }

}
