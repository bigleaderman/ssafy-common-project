package com.ssafy.mafia.Model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SettingsDto {
    private RoomInfoDto roomInfo;
    private GameInfoDto gameInfo;

    private RoomInfoResponseDto roomResponse;

    public SettingsDto(){
        roomInfo = new RoomInfoDto();
        gameInfo = new GameInfoDto();
    }


}
