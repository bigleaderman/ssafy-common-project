package com.ssafy.mafia.Model;

import lombok.Data;

import java.sql.Timestamp;
@Data
public class ReportedListResponseDto {
    private String reportType;
    private String reportingUser;
    private Timestamp reportingAt;
}
