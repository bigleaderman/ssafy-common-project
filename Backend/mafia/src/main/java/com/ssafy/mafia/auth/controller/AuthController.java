package com.ssafy.mafia.auth.controller;

import com.ssafy.mafia.auth.controller.dto.TokenDto;
import com.ssafy.mafia.auth.controller.dto.TokenRequestDto;
import com.ssafy.mafia.auth.controller.dto.UserRequestDto;
import com.ssafy.mafia.auth.controller.dto.UserResponseDto;
import com.ssafy.mafia.auth.service.AuthService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Api(tags = "회원관리")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    @ApiOperation(value="회원가입", notes="회원가입한다.", response = UserResponseDto.class)
    public ResponseEntity<UserResponseDto> signup(@RequestBody UserRequestDto userRequestDto) {
        return ResponseEntity.ok(authService.signup(userRequestDto));
    }

    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes="로그인을 한다")
    public ResponseEntity<TokenDto> login(@RequestBody UserRequestDto userRequestDto) {
        return ResponseEntity.ok(authService.login(userRequestDto));
    }

    @PostMapping("/reissue")
    @ApiOperation(value = "토큰재발급", notes = "access및 refresh토큰을 재발급한다.")
    public ResponseEntity<TokenDto> reissue(@RequestBody TokenRequestDto tokenRequestDto) {
        return ResponseEntity.ok(authService.reissue(tokenRequestDto));
    }

    @DeleteMapping("user/logout")
    @ApiOperation(value = "로그아웃", notes = "refresh토큰 DB에서 삭제")
    public ResponseEntity<?> logout() {
        authService.logout();
        return new ResponseEntity<>(HttpStatus.OK);
    }
}