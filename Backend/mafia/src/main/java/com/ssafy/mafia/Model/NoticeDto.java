package com.ssafy.mafia.Model;

import com.ssafy.mafia.auth.util.SecurityUtil;
import lombok.Data;

@Data
public class NoticeDto {

    private String title;

    private String content;
    // 토큰에 들어있음 안보내줘도됨
    private int userSeq;


}
