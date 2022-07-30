package com.ssafy.mafia.Model;

import io.swagger.annotations.ApiParam;
import lombok.Data;

@Data
public class FollowDto {
    @ApiParam(value = "친구의 닉네임", required = true)
    private String friendNickname;
    @ApiParam(value = "요청유저의 pk", required = true)
    private int userSeq;
}
