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
public class RoomInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int roomSeq;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = true, length = 1000)
    private String password;

    private int capacity;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "userSeq", name = "hostUser")
    private User hostUser;


    @JsonIgnore
    @OneToOne(mappedBy = "roomInfoSeq", fetch = FetchType.LAZY)
    private GameInfo roomInfoSeq;




}
