package com.ssafy.mafia.Model.RoomProtocol;

import lombok.Data;

@Data
public class RoomMessageDto {
    private RoomHeaderDto header;
    private RoomDataDto data;
}
