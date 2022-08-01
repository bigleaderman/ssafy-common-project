package com.ssafy.mafia.Model;

import io.swagger.annotations.ApiParam;
import lombok.Data;

@Data
public class ReportDto {
    @ApiParam(value = "신고요청유저의 pk", required = true)
    private int reportingUserSeq;
    @ApiParam(value = "신고대상유저의 pk", required = true)
    private int reportedUserSeq;
    @ApiParam(value = "신고유형", required = true)
    private String reportType;
}
