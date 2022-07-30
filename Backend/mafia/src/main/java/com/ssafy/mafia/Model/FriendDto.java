package com.ssafy.mafia.Model;

import io.swagger.annotations.ApiParam;
import lombok.Data;


@Data
public class FriendDto {
    @ApiParam(value = "친구요청유저의 pk", required = true)
    private int fromUser;
    @ApiParam(value = "친구대상유저의 pk", required = true)
    private int toUser;
}
