package com.ssafy.mafia.auth.controller;


import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.auth.controller.dto.UserRequestDto;
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
    @GetMapping("/admin/findUser")
    public ResponseEntity<User> getUserInfo(@RequestBody String email) {
        return ResponseEntity.ok(userService.getUserInfo(email));
    }

    @GetMapping("/checkEmail")
    public Boolean checkEmail(@RequestBody UserRequestDto userRequestDto) {
        return userService.checkEmail(userRequestDto.getEmail());
    }

    @GetMapping("/checkNickname")
    public Boolean checkNickname(@RequestBody UserRequestDto userRequestDto) {
        return userService.checkNickname(userRequestDto.getNickname());
    }

    @PutMapping("/user/enrollNickname")
    public ResponseEntity<User> enrollNickname(@RequestBody UserRequestDto userRequestDto) {
        return ResponseEntity.ok(userService.enrollNickname(userRequestDto.getNickname()));
    }

    @DeleteMapping("/user/delete")
    public void deleteUser() {
        userService.deleteUser();
    }

    @GetMapping("/user/checkPw")
    public boolean checkPw(@RequestBody UserRequestDto userRequestDto) {
        return userService.checkPw(userRequestDto.getPassword());
    }

    @PostMapping("user/changePw")
    public User changePw(@RequestBody UserRequestDto userRequestDto) {
        return userService.changePw(userRequestDto.getPassword());
    }




}
