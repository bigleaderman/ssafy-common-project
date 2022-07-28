package com.ssafy.mafia.Controller;

import com.ssafy.mafia.Model.RoomInfoDto;
import com.ssafy.mafia.Model.SettingsDto;
import com.ssafy.mafia.Service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/room")
@CrossOrigin("*")
public class RoomController {

    @Autowired
    private RoomService service;

    @PostMapping
    public ResponseEntity<?> createRoom(){
        // 유저정보, 방정보 필요
        // 방 생성
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<?> getRoomList(){
        // 방 목록 조회
        return new ResponseEntity<List<RoomInfoDto>>(service.getAllRooms(), HttpStatus.OK);
    }

    @PostMapping("/list")
    public ResponseEntity<?> searchByFilter(){
        // 방 목록 필터로 검색
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @GetMapping("/{room_seq}/info")
    public ResponseEntity<?> roomDetailInfo(){
        // 방 상세 정보 조회
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PutMapping("/{room_seq}")
    public ResponseEntity<?> modifyRoomInfo(@RequestBody RoomInfoDto room){
        // 방 상세 정보 수정
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @DeleteMapping("/{room_seq}")
    public ResponseEntity<?> deleteRoom(){
        // 방 삭제
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PostMapping("/{room_seq}/join")
    public ResponseEntity<?> joinRoom(){
        // 방 입장
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PostMapping("/{room_seq}/leave")
    public ResponseEntity<?> leaveRoom(){
        // 방 퇴장
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PostMapping("/{room_seq}/change-host")
    public ResponseEntity<?> passHost(){
        // 호스트 권한 넘겨주기
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

}
