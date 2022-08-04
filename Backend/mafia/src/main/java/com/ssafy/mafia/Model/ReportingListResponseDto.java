package com.ssafy.mafia.Model;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class ReportingListResponseDto {
    private String reportType;
    private String reportedUser;
    private Timestamp reportingAt;
}
