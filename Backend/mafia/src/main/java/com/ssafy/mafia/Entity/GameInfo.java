package com.ssafy.mafia.Entity;


import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class GameInfo {
    private int mafiaNum;

    private int policeNum;

    private int doctorNum;

    private int voteTimeoutSec;

    private int talkTimeoutSec;


    private int night;

    // default values
    public GameInfo() {
        mafiaNum = 1;
        policeNum = 1;
        doctorNum = 1;
        voteTimeoutSec = 30;
        talkTimeoutSec = 60;
        night = 30;
    }

}
