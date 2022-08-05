package com.ssafy.mafia.Model.matching_connection;

import com.ssafy.mafia.Model.GameInfoDto;
import com.ssafy.mafia.Model.RoomInfoDto;
import com.ssafy.mafia.auth.controller.dto.UserInfoResponseDto;
import lombok.Data;

import java.util.List;

@Data
public class SuccessMatchingResponseData {
    private RoomInfoDto roomInfo;
    private GameInfoDto gameInfo;
    private List<UserInfoResponseDto> userInfo;
}
