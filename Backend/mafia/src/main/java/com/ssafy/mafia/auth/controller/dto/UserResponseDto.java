package com.ssafy.mafia.auth.controller.dto;

import com.ssafy.mafia.Entity.User;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {
    @ApiParam(value = "유저이메일", required = true)
    private String email;

    // static인 이유를 모르겠
    public static UserResponseDto of(User user){
        return new UserResponseDto(user.getEmail());
    }
}
