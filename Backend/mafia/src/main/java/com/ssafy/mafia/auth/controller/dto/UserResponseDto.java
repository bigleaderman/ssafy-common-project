package com.ssafy.mafia.auth.controller.dto;

import com.ssafy.mafia.Entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {
    private String email;

    // static인 이유를 모르겠
    public static UserResponseDto of(User user){
        return new UserResponseDto(user.getEmail());
    }
}
