package com.ssafy.mafia.Model;

import lombok.Data;

@Data
public class MessageDto {
    private String roomSeq;
    private String senderNickname;
    private String message;
}
