package com.ssafy.mafia.auth.controller.dto;

import com.ssafy.mafia.Entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoResponseDto {
    private String email;

    private String nickname;

    private boolean isAuth;

    private boolean isRedUser;

    private  int winCount;

    private  int loseCount;

    private  int rankPoint;

    public static UserInfoResponseDto convert(User user){
        return new UserInfoResponseDto(user.getEmail(), user.getNickname(), user.isRedUser(), user.isAuth(), user.getWinCount(), user.getLoseCount(), user.getRankPoint());
    }
}
