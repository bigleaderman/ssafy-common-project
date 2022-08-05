package com.ssafy.mafia.Model;

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
}
