package com.ssafy.mafia.Controller;



import com.ssafy.mafia.Model.ReportDto;
import com.ssafy.mafia.Service.ReportService;
import com.ssafy.mafia.Service.SessionService;
import com.ssafy.mafia.auth.util.SecurityUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Api(value = "ReportController V1",tags = {"신고관련기능"})
@RestController
@RequestMapping("/api/user/report")
@RequiredArgsConstructor

public class ReportController {

    private final ReportService reportService;
    private static final Logger log = LoggerFactory.getLogger(ReportController.class);


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
            log.error("잘못된 요청입니다"+ e);
            e.printStackTrace();
            return new ResponseEntity<String>("잘못된 요청입니다.",HttpStatus.BAD_REQUEST);
        }
    }

}


