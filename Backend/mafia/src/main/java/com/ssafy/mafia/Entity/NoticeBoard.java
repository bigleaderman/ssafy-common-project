package com.ssafy.mafia.Entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
public class NoticeBoard {
    @Id
    @GeneratedValue
    private int noticeSeq;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition ="TEXT")
    private String content;

    private Timestamp createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User userSeq;
}
