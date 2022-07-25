package com.ssafy.mafia.Entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
public class Friend {
    @Id
    @GeneratedValue
    private int friendSeq;

    private boolean isAccept;

    private Timestamp applyAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "userSeq", name = "friendFrom", nullable = false)
    private User friendFrom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "userSeq", name = "friendTo", nullable = false)
    private User friendTo;


}
