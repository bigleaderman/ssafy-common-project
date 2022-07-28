package com.ssafy.mafia.Model;

import lombok.Data;

@Data
public class RoomInfoDto {

    public RoomInfoDto(){}

    public RoomInfoDto(int roomSeq, String hostUser, String title, int capacity) {
        this.roomSeq = roomSeq;
        this.hostUser = hostUser;
        this.title = title;
        this.capacity = capacity;
    }

    private int roomSeq;
    private String hostUser;
    private String title;
    private int capacity;
}
