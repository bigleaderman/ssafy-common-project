package com.ssafy.mafia.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

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

    private LocalDate createdAt;

    @JsonIgnore
    @Column(nullable = false, length = 1023)
    @NotBlank(message = "비밀번호를 입력해주세요.")
    @Pattern(regexp = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$",
            message = "비밀번호는 최소 8자리이면서 1개 이상의 알파벳, 숫자, 특수문자를 포함해야합니다.")
    private String password;

    @Column(nullable = true)
    private String nickname;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    private boolean isLogin;

    private boolean isRedUser;

    private int winCount;

    private int loseCount;

    private int reportedCount;

    private int rankPoint;

    private int nowRoomSeq;

    private Timestamp beRedUserAt;

    private int emailCode;


    @OneToMany(mappedBy = "reporting", cascade = CascadeType.ALL)
    private List<Report> reporting = new ArrayList<>();


    @OneToMany(mappedBy = "reported", cascade = CascadeType.ALL)
    private List<Report> reported = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "friendFrom", cascade = CascadeType.ALL)
    private List<Friend> friendFrom = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "friendTo", cascade = CascadeType.ALL)
    private List<Friend> friendTo = new ArrayList<>();


}
