package com.ssafy.mafia.Model;

import lombok.Data;

@Data
public class FriendResponseDto {
    //friend 테이블의 pk값
    private int friendSeq;
    //친구의 닉네임
    private String nickname;
    //친구인가?
    private boolean isAccept;
}
