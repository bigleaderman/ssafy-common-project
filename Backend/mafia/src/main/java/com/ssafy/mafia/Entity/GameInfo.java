package com.ssafy.mafia.Entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.util.Lazy;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class GameInfo {

    @Id
    @GeneratedValue
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
        mafiaNum = 1;
        policeNum = 0;
        doctorNum = 0;
        voteTimeoutSec = 120;
        talkTimeoutSec = 30;
        day = 0;
        night = 0;
    }

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "roomSeq", name = "roomInfoSeq")
    private RoomInfo roomInfoSeq;

}
