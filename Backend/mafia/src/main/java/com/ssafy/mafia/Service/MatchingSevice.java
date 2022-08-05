package com.ssafy.mafia.Service;

import com.ssafy.mafia.Entity.GameInfo;
import com.ssafy.mafia.Entity.RoomInfo;
import com.ssafy.mafia.Model.GameInfoDto;
import com.ssafy.mafia.Model.RoomInfoDto;
import com.ssafy.mafia.Model.SettingsDto;
import com.ssafy.mafia.Repository.GameRespository;
import com.ssafy.mafia.Repository.RoomRespository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;


@Service
@Transactional
@RequiredArgsConstructor
public class MatchingSevice {

    private final EntityManager em;
    private final GameRespository gameRespository;
    private final RoomRespository roomRespository;

    public SettingsDto MakingRoom(int UserId) {
        RoomInfo roomInfo = new RoomInfoDto().toRoomInfo(UserId);
        GameInfo gameInfo = new GameInfoDto().toGameInfo();
        gameInfo.setRoomInfoSeq(roomInfo);

        GameInfoDto gameInfoDto = GameInfoDto.convert(gameInfo);
        RoomInfoDto roomInfoDto = RoomInfoDto.convert(roomInfo);

        gameRespository.save(gameInfo);
        roomRespository.save(roomInfo);

        SettingsDto settingsDto = new SettingsDto();
        settingsDto.setRoomInfo(roomInfoDto);
        settingsDto.setGameInfo(gameInfoDto);

        return settingsDto;


    }


}
