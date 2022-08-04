package com.ssafy.mafia.Controller;

import com.ssafy.mafia.Entity.Report;
import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.ReportedListResponseDto;
import com.ssafy.mafia.Model.ReportingListResponseDto;
import com.ssafy.mafia.Service.AdminService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Api(value = "AdminController V1", tags = {"관리자기능"})
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {


    private final AdminService adminService;


    //유저 전체 리스트 조회
    @ApiOperation(value = "유저전체 리스트조회",notes = "모든 유저 정보를 반환한다.", response = Map.class)
    @GetMapping ("/all/list")
    public ResponseEntity<List<User>> getAllUser() {
        try {
            return new ResponseEntity<List<User>>(adminService.getAllUser(), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    //유저Seq로 세부조회
    @ApiOperation(value = "유저조회",notes = "유저 정보를 반환한다.", response = Map.class)
    @GetMapping("/{userSeq}")
    public ResponseEntity<User> getUser(@PathVariable("userSeq")@ApiParam(value = "대상유저 pk", readOnly = true) int userSeq){
        return new ResponseEntity<User>(adminService.getUser(userSeq),HttpStatus.OK);
    }

    // 레드유저 관리
    @ApiOperation(value = "레드유저 해제 및 등록", notes = "해당 유저의 레드유저 상태를 반전한다")
    @PostMapping("/red/{userSeq}")
    public ResponseEntity<?> redUserControl(@PathVariable("userSeq")@ApiParam(value = "대상유저 pk", readOnly = true) int userSeq){
        try {
            adminService.redControl(userSeq);
            return new ResponseEntity<Void>(HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("잘못된 요청입니다.",HttpStatus.BAD_REQUEST);
        }
    }

    //유저가 신고한 리스트
    @ApiOperation(value = "유저가 신고한 리스트조회",notes = "신고대상유저와 신고내용을 반환.", response = Map.class)
    @GetMapping("/{userSeq}/reporting-list")
    public ResponseEntity<?> reportingList(@PathVariable("userSeq")@ApiParam(value = "대상유저 pk", readOnly = true) int userSeq){
        return new ResponseEntity<List<ReportingListResponseDto>>(adminService.reportingList(userSeq),HttpStatus.OK);
    }
    //유저가 신고당한 리스트
    @ApiOperation(value = "유저를 신고한 리스트조회",notes = "신고한유저와 신고내용을 반환.", response = Map.class)
    @GetMapping("/{userSeq}/reported-list")
    public ResponseEntity<?> reportedList(@PathVariable("userSeq")@ApiParam(value = "대상유저 pk", readOnly = true) int userSeq){
        return new ResponseEntity<List<ReportedListResponseDto>>(adminService.reportedList(userSeq),HttpStatus.OK);
    }


}
