package com.ssafy.mafia.Model;

import lombok.Data;

@Data
public class ReportDto {
    private int reportingUserSeq;
    private int reportedUserSeq;
    private String reportType;
}
