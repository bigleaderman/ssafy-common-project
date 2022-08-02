package com.ssafy.mafia.Model;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class NoticeResponseDto {
    private int noticeSeq;
    private String title;
    private String content;
    private String writer;
    private Timestamp createAt;

}
