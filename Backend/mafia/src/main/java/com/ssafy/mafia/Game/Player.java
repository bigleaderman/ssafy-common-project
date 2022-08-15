package com.ssafy.mafia.Game;

import lombok.Data;

@Data
public class Player {
    private int userSeq=0;
    private String nickname="";
    private String role="civil";
    private boolean dead=false;
    private int voteCnt=0;
    private int target=0;

    public void voted(){
        voteCnt++;
    }
}
