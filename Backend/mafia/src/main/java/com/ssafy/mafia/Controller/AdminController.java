package com.ssafy.mafia.Controller;

import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.AdminDto;
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
            return null;
        }
    }

    // 레드유저 관리
    @ApiOperation(value = "레드유저 해제 및 등록", notes = "해당 유저의 레드유저 상태를 반전한다")
    @PostMapping("/red/{userSeq}")
    public ResponseEntity<?> redUserControl(@PathVariable("userSeq")@ApiParam(value = "대상유저 pk", readOnly = true) int userSeq){
        try {
            adminService.redControl(userSeq);
            return new ResponseEntity<Void>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<String>("잘못된 요청입니다.",HttpStatus.BAD_REQUEST);
        }
    }



}
