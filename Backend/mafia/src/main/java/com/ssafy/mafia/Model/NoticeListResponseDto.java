package com.ssafy.mafia.Model;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class NoticeListResponseDto {
    private int noticeSeq;
    private String title;
    private String writer;
    private Timestamp createAt;

}
