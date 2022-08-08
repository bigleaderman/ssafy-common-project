package com.ssafy.mafia.Model.RoomProtocol;

import lombok.Data;

@Data
public class RoomDataDto {
    private String title;
    private String nickname;
    private String message;
    private String status;
    private String chairNum;
    private String color;
    private double x;
    private double y;
    private int capacity;
    private int mafia;
    private int police;
    private int doctor;
    private int talkTime;
    private int voteTime;
    private int nightTime;
}
