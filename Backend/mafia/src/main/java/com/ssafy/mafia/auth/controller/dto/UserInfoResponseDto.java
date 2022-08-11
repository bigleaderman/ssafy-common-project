package com.ssafy.mafia.auth.controller.dto;

import com.ssafy.mafia.Entity.Authority;
import com.ssafy.mafia.Entity.User;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoResponseDto {
    @ApiParam(value = "유저번호", required = true)
    private int userSeq;

    private Authority authority;

    @ApiParam(value = "이메일", required = true)
    private String email;

    @ApiParam(value = "닉네임", required = true)
    private String nickname;

    @ApiParam(value = "이메일인증 여부", required = true)
    private boolean isAuth;

    @ApiParam(value = "악성유저 여부", required = true)
    private boolean isRedUser;

    @ApiParam(value = "승리횟수", required = true)
    private  int winCount;

    @ApiParam(value = "진횟수", required = true)
    private  int loseCount;

    @ApiParam(value = "rankPoint", required = true)
    private  int rankPoint;

    @ApiParam(value = "자체회원인지, Oauth 회원인지", required = true)
    private boolean isOauth;

    public static UserInfoResponseDto convert(User user){
        return new UserInfoResponseDto(user.getUserSeq(),user.getAuthority(), user.getEmail(), user.getNickname(),
                user.isAuth(), user.isRedUser(), user.getWinCount(), user.getLoseCount(), user.getRankPoint(), user.isOauth() );
    }

}
