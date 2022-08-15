package com.ssafy.mafia.Model.RoomProtocol;


import lombok.Data;

@Data
public class GameProgressDataReq {
    private String nickname;
    private String job;
    private String target;
    private String message;
}
