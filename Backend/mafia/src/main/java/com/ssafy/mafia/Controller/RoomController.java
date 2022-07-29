package com.ssafy.mafia.Controller;

import com.ssafy.mafia.Model.GameInfoDto;
import com.ssafy.mafia.Model.RoomInfoDto;
import com.ssafy.mafia.Model.SettingsDto;
import com.ssafy.mafia.Model.UserDto;
import com.ssafy.mafia.Service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/room")
@CrossOrigin("*")
public class RoomController {
    private final RoomService service;

    @PostMapping
    public ResponseEntity<?> createRoom(SettingsDto requset){
        // 유저정보, 방정보 필요
        // 방 생성
        SettingsDto response = service.createRoom(new RoomInfoDto(), new GameInfoDto());
        return new ResponseEntity<SettingsDto>(response, HttpStatus.OK);
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

    @GetMapping("/{room-seq}/info")
    public ResponseEntity<?> roomDetailInfo(){
        // 방 상세 정보 조회

        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PutMapping("/{room-seq}")
    public ResponseEntity<?> modifyRoomInfo(@RequestBody RoomInfoDto roomInfo){
        // 방 상세 정보 수정
        service.modifyRoomInfo(roomInfo);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    // 방 삭제
    @DeleteMapping("/{room-seq}")
    public ResponseEntity<?> deleteRoom(@PathVariable("room-seq") int roomSeq){
        service.deleteRoom(roomSeq);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PostMapping("/{room-seq}/join")
    public ResponseEntity<?> joinRoom(@PathVariable int roomSeq, @RequestBody UserDto user){
        // 방 입장
        return new ResponseEntity<SettingsDto>(service.joinRoom(roomSeq, user), HttpStatus.OK);
    }

    @PostMapping("/{room-seq}/leave")
    public ResponseEntity<?> leaveRoom(@PathVariable int roomSeq){
        // 방 퇴장
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PostMapping("/{room-seq}/change-host")
    public ResponseEntity<?> passHost(@PathVariable("room-seq") int roomSeq, @RequestBody UserDto user){
        // 호스트 권한 넘겨주기

        return new ResponseEntity<Void>(HttpStatus.OK);
    }

}
