package com.ssafy.mafia.Model;

import com.ssafy.mafia.Entity.GameInfo;
import com.ssafy.mafia.Model.RoomProtocol.RoomDataDto;
import lombok.Data;

@Data
public class GameInfoDto {
    private int gameInfoSeq;
    private int mafiaNum;
    private int policeNum;
    private int doctorNum;
    private int voteTimeoutSec;
    private int talkTimeoutSec;
    private int day;
    private int night;

    public GameInfoDto() {
        gameInfoSeq = 0;
        mafiaNum=2;
        policeNum=1;
        doctorNum=1;
        voteTimeoutSec=15;
        talkTimeoutSec=15;
        day=90;
        night=30;
    }

    public GameInfoDto(GameInfo gameInfo) {
        this.gameInfoSeq = gameInfo.getGameInfoSeq();
        this.mafiaNum = gameInfo.getMafiaNum();
        this.policeNum = gameInfo.getPoliceNum();
        this.doctorNum = gameInfo.getDoctorNum();
        this.voteTimeoutSec = gameInfo.getVoteTimeoutSec();
        this.talkTimeoutSec = gameInfo.getTalkTimeoutSec();
        this.day = gameInfo.getDay();
        this.night = gameInfo.getNight();
    }

    public GameInfoDto(RoomDataDto roomData) {
        this.mafiaNum = roomData.getMafia();
        this.policeNum = roomData.getPolice();
        this.doctorNum = roomData.getDoctor();
        this.voteTimeoutSec = roomData.getVoteTime();
        this.talkTimeoutSec = roomData.getTalkTime();
        this.night = roomData.getNightTime();
    }
}
