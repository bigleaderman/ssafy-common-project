package com.ssafy.mafia.Model;

import lombok.Data;

@Data
public class RoomInfoDto {

    public RoomInfoDto(){
        hostUser = 0;
        title = "";
        capacity = 6;
        isLocked = false;
    }

    public RoomInfoDto(int hostUser){
        this.hostUser = hostUser;
        title = "";
        capacity = 6;
        isLocked = false;
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

    private String password;
    private boolean isLocked;
}
