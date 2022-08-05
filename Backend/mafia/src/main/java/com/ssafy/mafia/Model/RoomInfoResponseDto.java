package com.ssafy.mafia.Model;

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
}
