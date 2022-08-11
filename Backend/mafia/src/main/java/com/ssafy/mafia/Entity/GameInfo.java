package com.ssafy.mafia.Entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class GameInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int gameInfoSeq;

    private int mafiaNum;

    private int policeNum;

    private int doctorNum;

    private int voteTimeoutSec;

    private int talkTimeoutSec;

    private int day;

    private int night;

    // default values
    public GameInfo() {
        mafiaNum = 2;
        policeNum = 1;
        doctorNum = 1;
        voteTimeoutSec = 30;
        talkTimeoutSec = 60;
        day = 0;
        night = 30;
    }

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "roomSeq", name = "roomInfoSeq")
    private RoomInfo roomInfoSeq;

}
