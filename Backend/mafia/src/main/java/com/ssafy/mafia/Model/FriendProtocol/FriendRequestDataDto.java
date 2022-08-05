package com.ssafy.mafia.Model.FriendProtocol;

import lombok.Data;

@Data
public class FriendRequestDataDto {
    private int friendSeq;
    private String from;
    private String to;
}
