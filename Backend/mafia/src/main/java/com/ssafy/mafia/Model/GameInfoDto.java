package com.ssafy.mafia.Model;

import com.ssafy.mafia.Entity.GameInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GameInfoDto {
    private int gameInfoSeq;
    private int mafiaNum;
    private int policeNum;
    private int doctorNum;
    private int voteTimeoutSec;
    private int talkTimeoutSec;
    private int day;
    private int night;


    public GameInfo toGameInfo() {
        GameInfo gameInfo = new GameInfo();
        gameInfo.setMafiaNum(2);
        gameInfo.setPoliceNum(1);
        gameInfo.setDoctorNum(1);
        gameInfo.setVoteTimeoutSec(15);
        gameInfo.setTalkTimeoutSec(15);
        gameInfo.setDay(90);
        gameInfo.setNight(30);
        return gameInfo;
    }

    public static GameInfoDto convert(GameInfo gameInfo) {
        return new GameInfoDto(gameInfo.getGameInfoSeq(),gameInfo.getMafiaNum(),gameInfo.getPoliceNum(),gameInfo.getDoctorNum(),
                gameInfo.getVoteTimeoutSec(),gameInfo.getTalkTimeoutSec(),gameInfo.getDay(),gameInfo.getNight());
    }
}
