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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int friendSeq;

    private boolean isAccept;

    private Timestamp applyAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @PrimaryKeyJoinColumn(referencedColumnName = "userSeq", name = "friendFrom")
    private User friendFrom;

    @ManyToOne(fetch = FetchType.LAZY)
    @PrimaryKeyJoinColumn(referencedColumnName = "userSeq", name = "friendTo")
    private User friendTo;


}
