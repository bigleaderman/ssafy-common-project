package com.ssafy.mafia.Model;

import lombok.Data;

@Data
public class RoomInfoDto {

    public RoomInfoDto(){
        hostUser = 1;
        title = "title";
        capacity = 6;
    }

    public RoomInfoDto(int roomSeq, int hostUser, String title, int capacity) {
        this.roomSeq = roomSeq;
        this.hostUser = hostUser;
        this.title = title;
        this.capacity = capacity;
    }

    private int roomSeq;
    private int hostUser;
    private String title;
    private int capacity;
}
