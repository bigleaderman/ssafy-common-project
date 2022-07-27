package com.ssafy.mafia.Controller;

import com.ssafy.mafia.Model.RoomInfoDto;
import com.ssafy.mafia.Service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/room")
public class RoomController {

    @Autowired
    private RoomService service;

    @PostMapping("/create")
    public ResponseEntity<?> createRoom(){
        // 방 생성
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PutMapping("/modify")
    public ResponseEntity<?> modifyRoomInfo(@RequestBody RoomInfoDto room){
        // 방 정보 수정
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @GetMapping("/info/{roomid}")
    public ResponseEntity<?> roomDetailInfo(){
        // 방 정보 조회
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{roomid}")
    public ResponseEntity<?> deleteRoom(){
        // 방 삭제
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    @GetMapping("/list")
    public ResponseEntity<?> getRoomList(){
        // 방 목록 조회
        return new ResponseEntity<List<RoomInfoDto>>(service.getAllRooms(), HttpStatus.OK);
    }

    @PostMapping("/join")
    public ResponseEntity<?> joinRoom(){
        // 방 입장
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PostMapping("/leave")
    public ResponseEntity<?> leaveRoom(){
        // 방 퇴장
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PostMapping("/host")
    public ResponseEntity<?> passHost(){
        // 호스트 권한 넘겨주기
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PostMapping("/search")
    public ResponseEntity<?> searchByFilter(){
        // 필터로 검색
        return new ResponseEntity<Void>(HttpStatus.OK);
    }


}
