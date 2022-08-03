package com.ssafy.mafia.Model;

import lombok.Data;

@Data
public class RoomSearchFilterDto {
    private String title;
    private int capacity;
    private int mafiaNum;
}
