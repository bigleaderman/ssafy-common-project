package com.ssafy.mafia.Service;

import com.google.gson.JsonObject;
import com.ssafy.mafia.Entity.GameInfo;
import com.ssafy.mafia.Model.GameInfoDto;
import com.ssafy.mafia.Model.RoomInfoDto;
import com.ssafy.mafia.Model.SettingsDto;
import com.ssafy.mafia.Repository.GameRepo;
import io.openvidu.java.client.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class GameService {

    @Autowired
    private GameRepo gameRepo;

    // 게임 설정 삭제
    public void deleteGameSetting(int roomSeq){
        gameRepo.deleteGameInfo(roomSeq);
    }

    // 게임 설정 변경
    public GameInfoDto modifyGameSetting(int roomSeq, GameInfoDto gameInfo){
        GameInfo entity = gameRepo.setGameInfo(roomSeq, gameInfo);
        return null;
    }

    // 게임 설정 변경 json 패러미터
    public GameInfoDto modifyGameSetting(int roomSeq, JsonObject gameInfo){


        return null;
    }
}
