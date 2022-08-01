package com.ssafy.mafia.auth.controller;


import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.auth.controller.dto.UserInfoResponseDto;
import com.ssafy.mafia.auth.controller.dto.UserRequestDto;
import com.ssafy.mafia.auth.controller.dto.UserResponseDto;
import com.ssafy.mafia.auth.service.UserService;
import lombok.RequiredArgsConstructor;
import org.mapstruct.Mapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    // 자신의 회원 정보 조회
    @GetMapping("/user/me")
    public ResponseEntity<UserInfoResponseDto> getMyUserInfo() {
        return ResponseEntity.ok(UserInfoResponseDto.convert(userService.getMyInfo()));
    }

    //유저 상세 조회 filter 기능
    @GetMapping("/admin/findUser")
    public ResponseEntity<UserInfoResponseDto> getUserInfo(@RequestBody String email) {
        return ResponseEntity.ok(UserInfoResponseDto.convert(userService.getUserInfo(email)));
    }

    @GetMapping("/checkEmail")
    public boolean checkEmail(@RequestBody UserRequestDto userRequestDto) {
        return userService.checkEmail(userRequestDto.getEmail());
    }

    @GetMapping("/checkNickname")
    public Boolean checkNickname(@RequestBody UserRequestDto userRequestDto) {
        return userService.checkNickname(userRequestDto.getNickname());
    }

    @PutMapping("/user/enrollNickname")
    public ResponseEntity<UserInfoResponseDto> enrollNickname(@RequestBody UserRequestDto userRequestDto) {
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
    public UserInfoResponseDto changePw(@RequestBody UserRequestDto userRequestDto) {
        return userService.changePw(userRequestDto.getPassword());
    }

    @GetMapping("user/validationUser/{userId}/{num}")
    public boolean validationUser(@PathVariable("userId") int userId,@PathVariable("num") int num) throws Exception {
        return userService.validationUser(userId, num);
    }

    @GetMapping("user/{nickname}")
    public ResponseEntity<UserInfoResponseDto> userInformation(@PathVariable("nickname") String nickname) {
        return ResponseEntity.ok(UserInfoResponseDto.convert(userService.userInfomation(nickname)));
    }


}
