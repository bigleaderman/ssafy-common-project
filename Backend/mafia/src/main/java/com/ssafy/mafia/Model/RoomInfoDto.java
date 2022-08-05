package com.ssafy.mafia.Model;

import com.ssafy.mafia.Entity.GameInfo;
import com.ssafy.mafia.Entity.RoomInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
public class RoomInfoDto {

    public RoomInfoDto(){
        hostUser = 1;
        title = "title";
        capacity = 6;
        isRandomMatching = false;

    }

    public RoomInfoDto(int roomSeq, int hostUser, String title, int capacity) {
        this.roomSeq = roomSeq;
        this.hostUser = hostUser;
        this.title = title;
        this.capacity = capacity;
        isRandomMatching = false;

    }

    private int roomSeq;
    private int hostUser;
    private String title;
    private int capacity;

    private boolean isRandomMatching;

    public RoomInfo toRoomInfo(int UserSeq) {

        RoomInfo roomInfo = new RoomInfo();
        roomInfo.setHostUser(UserSeq);
        roomInfo.setTitle("randomMatching");
        roomInfo.setCapacity(6);
        roomInfo.setPassword("12345678");
        roomInfo.setRandomMatching(true);
        return roomInfo;
    }

    public static RoomInfoDto convert(RoomInfo roomInfo) {
        return new RoomInfoDto(roomInfo.getRoomSeq(), roomInfo.getHostUser(), roomInfo.getTitle(), roomInfo.getCapacity(), roomInfo.isRandomMatching());
    }
}
