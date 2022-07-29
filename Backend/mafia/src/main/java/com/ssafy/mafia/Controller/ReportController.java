package com.ssafy.mafia.Controller;


import com.ssafy.mafia.Model.ReportDto;
import com.ssafy.mafia.Service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user/report")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;
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


