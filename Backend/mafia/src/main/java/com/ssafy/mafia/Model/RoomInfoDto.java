package com.ssafy.mafia.Model;

import com.ssafy.mafia.Entity.RoomInfo;
import com.ssafy.mafia.Model.RoomProtocol.RoomDataDto;
import lombok.Data;

@Data
public class RoomInfoDto {

    public RoomInfoDto(){
        hostUser = 0;
        title = "";
        capacity = 6;
        isLocked = false;
        isMatching = false;
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

    public RoomInfoDto(RoomInfo roomInfo){
        this.roomSeq = roomInfo.getRoomSeq();
        this.hostUser = roomInfo.getHostUser();
        this.title = roomInfo.getTitle();
        this.capacity = roomInfo.getCapacity();
        this.isLocked = (roomInfo.getPassword() != "" && roomInfo.getPassword() != null);
    }

    public RoomInfoDto(RoomDataDto roomData){
        this.title = roomData.getTitle();
        this.capacity = roomData.getCapacity();
    }

    private int roomSeq;
    private int hostUser;
    private String title;
    private int capacity;

    private String password;
    private boolean isLocked;

    private boolean isMatching;
}
