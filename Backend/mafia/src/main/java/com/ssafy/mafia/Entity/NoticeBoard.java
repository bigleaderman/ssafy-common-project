package com.ssafy.mafia.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
@ToString
public class NoticeBoard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int noticeSeq;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition ="TEXT")
    private String content;

    private Timestamp createdAt;

    private int writer;



}
