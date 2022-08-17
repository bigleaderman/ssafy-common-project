package com.ssafy.mafia.Model;


import com.ssafy.mafia.Entity.User;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor

public class RankDto {
    @ApiParam(value = "nickname", required = true)
    private String nickname;

    @ApiParam(value = "winCount", required = true)
    private int winCount;
    @ApiParam(value = "loseCount", required = true)
    private int loseCount;
    @ApiParam(value = "rankPoint", required = true)
    private int rankPoint;

    public static RankDto rankConvert(User user){
        return new RankDto(user.getNickname(), user.getWinCount(), user.getLoseCount(), user.getRankPoint());
    }
}
