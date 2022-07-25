package com.ssafy.mafia.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class RoomUser {
    @Id
    @GeneratedValue
    private int seq;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "roomSeq", name = "room")
    private RoomInfo room;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "userSeq", name = "user")
    private User user;




}
