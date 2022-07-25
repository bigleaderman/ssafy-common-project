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

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "roomSeq", name = "roomInfoSeq")
    private RoomInfo roomInfoSeq;

}
