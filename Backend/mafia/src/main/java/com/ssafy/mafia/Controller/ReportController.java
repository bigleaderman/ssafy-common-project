package com.ssafy.mafia.Controller;


import com.ssafy.mafia.Model.ReportDto;
import com.ssafy.mafia.Service.ReportService;
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

@Api("ReportController V1")
@RestController
@RequestMapping("/api/user/report")
@RequiredArgsConstructor

public class ReportController {

    private final ReportService reportService;

    //신고기능 User테이블에 신고당한 횟수 컬럼 만들어서 신고할때 체크해서 10번이상이면 is_red를 true로 바꾸는 기능 필요
    @ApiOperation(value = "유저신고", notes = "Report 테이블에 새로운 데이터를 생성한다", response = Map.class)
    @PostMapping
    public ResponseEntity<?> reportRequest(@RequestBody ReportDto reportDto){
        try {
            reportService.report(reportDto);
            return new ResponseEntity<Void>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<String>("잘못된 요청입니다.",HttpStatus.BAD_REQUEST);
        }
    }
}


