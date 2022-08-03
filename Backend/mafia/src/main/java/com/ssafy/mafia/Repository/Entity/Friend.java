package com.ssafy.mafia.Repository.Entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
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


    @ManyToOne
    @JsonBackReference
    @PrimaryKeyJoinColumn(referencedColumnName = "userSeq", name = "friendFrom")
    private User friendFrom;


    @ManyToOne
    @JsonBackReference
    @PrimaryKeyJoinColumn(referencedColumnName = "userSeq", name = "friendTo")
    private User friendTo;


}
