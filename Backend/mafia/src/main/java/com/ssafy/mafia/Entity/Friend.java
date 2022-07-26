package com.ssafy.mafia.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
//@ToString
public class Friend {
    @Id
    @GeneratedValue
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
