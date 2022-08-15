package com.ssafy.mafia.Model;

import com.ssafy.mafia.Entity.RoomInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomInfoResponseDto {
    private int roomSeq;
    private int hostUser;
    private String title;
    private int capacity;
    private int participants;
    private boolean isLocked;

    public RoomInfoResponseDto(RoomInfo roomInfo){
        this.roomSeq = roomInfo.getRoomSeq();
        this.hostUser = roomInfo.getHostUser();
        this.title = roomInfo.getTitle();
        this.capacity = roomInfo.getCapacity();
        this.isLocked = (roomInfo.getPassword() != null && !roomInfo.getPassword().equals(""));
    }
}
