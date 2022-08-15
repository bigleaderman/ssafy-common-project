package com.ssafy.mafia.Model;

import lombok.Data;

@Data
public class MessageDto {
    private String type; // 채팅 타입
    private String roomSeq; // 방 번호
    private String senderNickname; // 보내는 사람 닉네임
    private String message; // 채팅 메시지
    private boolean isUpdate; // 방 정보가 업데이트 되었는가?
}
