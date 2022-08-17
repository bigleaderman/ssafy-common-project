package com.ssafy.mafia.Model.LobbyProtocol;

import lombok.Data;

@Data
public class LobbyMessage {
    private LobbyHeader header;
    private LobbyData data;
}
