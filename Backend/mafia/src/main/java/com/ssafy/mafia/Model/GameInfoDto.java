package com.ssafy.mafia.Model;

import com.ssafy.mafia.Entity.GameInfo;
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
}
