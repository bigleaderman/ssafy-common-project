package com.ssafy.mafia.Controller;


import com.ssafy.mafia.Model.ReportDto;
import com.ssafy.mafia.Service.ReportService;
import com.ssafy.mafia.auth.util.SecurityUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Api(value = "ReportController V1",tags = {"신고관련기능"})
@RestController
@RequestMapping("/api/user/report")
@RequiredArgsConstructor

public class ReportController {

    private final ReportService reportService;

    //신고기능
    @ApiOperation(value = "유저신고", notes = "Report 테이블에 새로운 데이터를 생성한다")
    @PostMapping
    public ResponseEntity<?> reportRequest(@RequestBody ReportDto reportDto){
        int userSeq = SecurityUtil.getCurrentUserId();
        reportDto.setReportingUserSeq(userSeq);

        try {
            reportService.report(reportDto);
            return new ResponseEntity<Void>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<String>("잘못된 요청입니다.",HttpStatus.BAD_REQUEST);
        }
    }
}


