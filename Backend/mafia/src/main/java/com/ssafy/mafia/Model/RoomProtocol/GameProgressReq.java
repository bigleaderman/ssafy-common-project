package com.ssafy.mafia.Model.RoomProtocol;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GameProgressReq {
    private GameProgressHeaderReq header;
    private GameProgressDataReq data;
}
