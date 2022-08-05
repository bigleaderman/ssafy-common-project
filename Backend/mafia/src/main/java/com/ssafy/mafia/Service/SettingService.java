package com.ssafy.mafia.Service;

import com.ssafy.mafia.Model.SettingsDto;
import org.springframework.stereotype.Service;

@Service
public class SettingService {

    public SettingsDto setting() {
        SettingsDto settingsDto = new SettingsDto();
        // default 게임 setting
        settingsDto.getGameInfo().setGameInfoSeq(2); //임의로 지정
        settingsDto.getGameInfo().setDay(90);
        settingsDto.getGameInfo().setNight(30);
        settingsDto.getGameInfo().setMafiaNum(2);
        settingsDto.getGameInfo().setDoctorNum(1);
        settingsDto.getGameInfo().setPoliceNum(1);
        settingsDto.getGameInfo().setVoteTimeoutSec(15);
        settingsDto.getGameInfo().setTalkTimeoutSec(15);

        //default 룸 정보 setting
        settingsDto.getRoomInfo().setCapacity(6);
        settingsDto.getRoomInfo().setTitle("랜덤매칭");
        settingsDto.getRoomInfo().setLocked(false);
        settingsDto.getRoomInfo().setRoomSeq(2);
        settingsDto.getRoomInfo().setMatch(true);
        return settingsDto;
    }
}
