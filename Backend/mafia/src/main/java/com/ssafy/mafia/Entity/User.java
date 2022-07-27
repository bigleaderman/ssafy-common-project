package com.ssafy.mafia.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import net.bytebuddy.asm.Advice;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
public class User {
    public User (){}

    public User(String email, String password){
        this.email = email;
        this.password = password;
        isAuth = false;
        isRedUser = false;
        winCount = 0;
        loseCount = 0;
        isLogin = false;
        reportedCount = 0;
        createdAt = Timestamp.from(Instant.now());
        rankPoint = 0;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userSeq;

    @Column(nullable = false, length = 255)
    private String email;

    private boolean isAuth;

    @Column(nullable = false, length = 1023)
    private String password;

    @Column(nullable = true)
    private String nickname;


    private boolean isRedUser;

    private boolean isAdmin;

    private int winCount;

    private int loseCount;

    private boolean isLogin;

    private int reportedCount;

    private Timestamp createdAt;

    private int rankPoint;

    @JsonIgnore
    @OneToMany(mappedBy = "userSeq")
    private List<NoticeBoard> noticeBoardList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "reporting")
    private List<Report> reporting = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "reported")
    private List<Report> reported = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "friendFrom")
    private List<Friend> friendFrom = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "friendTo")
    private List<Friend> friendTo = new ArrayList<>();

    @JsonIgnore
    @OneToOne(mappedBy = "hostUser", fetch = FetchType.LAZY)
    private RoomInfo hostUser;

    @JsonIgnore
    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    private RoomUser user;

}
