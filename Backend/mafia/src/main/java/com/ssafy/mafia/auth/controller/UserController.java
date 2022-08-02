package com.ssafy.mafia.auth.controller;


import com.ssafy.mafia.Repository.Entity.User;
import com.ssafy.mafia.auth.controller.dto.UserInfoResponseDto;
import com.ssafy.mafia.auth.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
@Api(tags = "회원관리기능")
public class UserController {

    private final UserService userService;

    // 자신의 회원 정보 조회
    @GetMapping("/user/me")
    @ApiOperation(value = "자신의 정보조회", notes = "Token으로 정보를 받기 때문에 ", response = UserInfoResponseDto.class)
    public ResponseEntity<UserInfoResponseDto> getMyUserInfo() {
        return ResponseEntity.ok(UserInfoResponseDto.convert(userService.getMyInfo()));
    }

    //유저 상세 조회 filter 기능
    @GetMapping("/admin/findUser")
    @ApiOperation(value = "관리자가 유저상세조회", notes = "유저 이메일을 통해서 상세 조회", response = UserInfoResponseDto.class)
    public ResponseEntity<User> getUserInfo(@ApiParam(value = "email", example = "ssafy@naver.com") @RequestBody String email) {
        return ResponseEntity.ok(userService.getUserInfo(email));
    }

    @GetMapping("/checkEmail")
    @ApiOperation(value = "이메일중복확인", notes="DB에 유저 이메일이 있는지 확인", response = boolean.class)
    public boolean checkEmail(@ApiParam(value = "email", example = "ssafy@naver.com") @RequestBody String email) {
        return userService.checkEmail(email);
    }

    @GetMapping("user/checkNickname")
    @ApiOperation(value = "닉네임중복확인", notes = "DB에 유저 닉네임이 있는지 확인", response = boolean.class)
    public boolean checkNickname(@ApiParam(value = "nickname", example = "닉네임명")@RequestBody String nickname) {
        return userService.checkNickname(nickname);
    }

    @PutMapping("/user/enrollNickname")
    @ApiOperation(value = "닉네임등록", notes = "유저닉네임 등록하기", response = UserInfoResponseDto.class)
    public ResponseEntity<?> enrollNickname(@ApiParam(value = "nickname", example = "닉네임명")@RequestBody String nickname) {
        return ResponseEntity.ok(userService.enrollNickname(nickname));
    }

    @DeleteMapping("/user/delete")
    @ApiOperation(value = "유저삭제", notes = "현재 접속해 있는 유저를 삭제함", response = void.class)
    public void deleteUser() {
        userService.deleteUser();
    }

    @GetMapping("/user/checkPw")
    @ApiOperation(value = "비밀번호확인", notes = "입력받은 비밀번호와 현재 유저의 비밀번호가 같은지 확인", response = boolean.class)
    public boolean checkPw(@RequestBody String password) {
         return userService.checkPw(password);
    }

    @PostMapping("/user/changePw")
    @ApiOperation(value = "비밀번호변경", notes = "입력받은 비밀번호로 변경하기", response = void.class)
    public void changePw(@ApiParam(value = "새비밀번호", example = "ssafy1!") @RequestBody String password) {
        userService.changePw(password);
    }



    @GetMapping("user/findUserByNickname")
    @ApiOperation(value = "닉네임으로 유저정보 제공", notes = "유저 정보 제공하기", response = UserInfoResponseDto.class)
    public ResponseEntity<UserInfoResponseDto> userInformation(@ApiParam(value = "nickname", example = "ssafy1!") @RequestBody String nickname) {
        return ResponseEntity.ok(UserInfoResponseDto.convert(userService.userInformation(nickname)));
    }


}
