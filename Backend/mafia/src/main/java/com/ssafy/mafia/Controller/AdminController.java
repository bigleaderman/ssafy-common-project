package com.ssafy.mafia.Controller;

import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.AdminDto;
import com.ssafy.mafia.Model.NoticeDto;
import com.ssafy.mafia.Service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    //유저 전체 리스트 조회
    @GetMapping ("/all/list")
    public ResponseEntity<?> getAllUser() {
        return new ResponseEntity<List<User>>(adminService.getAllUser(), HttpStatus.OK);

    }

    // 레드유저 관리
    @PostMapping("/red/{userSeq}")
    public ResponseEntity<?> redUserControl(@PathVariable("userSeq") int userSeq){
        adminService.redControl(userSeq);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }



}
