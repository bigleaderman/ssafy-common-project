package com.ssafy.mafia.Model;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiParam;
import lombok.Data;

@ApiModel
@Data
public class FriendResponseDto {
    //friend 테이블의 pk값
    @ApiParam(value = "friend 테이블의 pk값", required = true)
    private int friendSeq;
    //친구의 닉네임
    @ApiParam(value = "친구의 닉네임", required = true)
    private String nickname;
    //친구인가?
    @ApiParam(value = "친구수락을 하였는지에 대한 정보", required = true)
    private boolean isAccept;
    //레드유저인가
    private boolean isRed;
}
