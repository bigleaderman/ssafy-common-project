package com.ssafy.mafia.Repository.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseTimeEntity{

    public User(String email, String password, Authority authority){
        this.email = email;
        this.password = password;
        this.authority = authority;
        isAuth = false;
        isRedUser = false;
        winCount = 0;
        loseCount = 0;
        reportedCount = 0;
        rankPoint = 0;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userSeq;

    @Column(nullable = false, length = 255)
    @NotBlank(message = "닉네임은 필수 입력입니다")
    @Email(message = "이메일 형식에 맞지 않습니다.")
    private String email;

    private boolean isAuth;

    @Column(nullable = false, length = 1023)
    private String password;

    @Column(nullable = true)
    private String nickname;

    @Enumerated(EnumType.STRING)
    private Authority authority;



    private boolean isRedUser;

    private int winCount;

    private int loseCount;

    private int reportedCount;

    private int rankPoint;

    private int nowRoomSeq;


    private Timestamp beRedUserAt;

    private int emailCode;


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



}
