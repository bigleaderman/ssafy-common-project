package com.ssafy.mafia.Controller;

import com.ssafy.mafia.Model.*;
import com.ssafy.mafia.Service.RoomService;
import com.ssafy.mafia.auth.util.SecurityUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/room")
@CrossOrigin("*")
@Api(tags = {"로비/대기방 기능"})
public class RoomController {
    private final RoomService service;

    @ApiOperation(value = "방 생성", notes = "방 생성")
    @PostMapping
    public ResponseEntity<SettingsDto> createRoom(@RequestBody SettingsDto requset){
        // 유저정보, 방정보 필요
        // 방 생성
        SettingsDto response = service.createRoom(new RoomInfoDto(), new GameInfoDto());
        return new ResponseEntity<SettingsDto>(response, HttpStatus.OK);
    }

    @ApiOperation(value = "방 전체 목록 조회", notes = "방 전체 목록 조회")
    @GetMapping("/list")
    public ResponseEntity<List<RoomInfoDto>> getRoomList(){
        // 방 목록 조회
        return new ResponseEntity<List<RoomInfoDto>>(service.getAllRooms(), HttpStatus.OK);
    }

    @ApiOperation(value = "필터를 이용한 방 목록 조회", notes = "필터를 이용한 방 목록 조회")
    @PostMapping("/list")
    public ResponseEntity<List<RoomInfoDto>> searchByFilter(@RequestBody RoomSearchFilterDto filter){
        // 방 목록 필터로 검색
        return new ResponseEntity<List<RoomInfoDto>>(service.searchRoomsByFilter(filter), HttpStatus.OK);
    }

    @ApiOperation(value = "방 상세 정보 조회", notes = "방 상세 정보 조회")
    @GetMapping("/{room-seq}/info")
    public ResponseEntity<RoomInfoDto> roomDetailInfo(@PathVariable("room-seq") int roomSeq){
        // 방 상세 정보 조회
        return new ResponseEntity<RoomInfoDto>(service.getRoomInfo(roomSeq), HttpStatus.OK);
    }

    @ApiOperation(value = "방 상세 정보 수정", notes = "방 상세 정보 수정")
    @PutMapping
    public ResponseEntity<RoomInfoDto> modifyRoomInfo(@RequestBody RoomInfoDto roomInfo){
        // 방 상세 정보 수정
        return new ResponseEntity<RoomInfoDto>(service.modifyRoomInfo(roomInfo), HttpStatus.OK);
    }

    // 방 삭제
    @ApiOperation(value = "방 삭제", notes = "방 삭제")
    @DeleteMapping("/{room-seq}")
    public ResponseEntity<Void> deleteRoom(@PathVariable("room-seq") int roomSeq){
        service.deleteRoom(roomSeq);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @ApiOperation(value = "방 입장", notes = "방 입장")
    @PostMapping("/{room-seq}/join")
    public ResponseEntity<SettingsDto> joinRoom(@PathVariable("room-seq") int roomSeq){
        int userSeq = SecurityUtil.getCurrentUserId();
        // 방 입장
        return new ResponseEntity<SettingsDto>(service.joinRoom(roomSeq, userSeq), HttpStatus.OK);
    }

    @ApiOperation(value = "방 퇴장", notes = "방 퇴장")
    @PostMapping("/{room-seq}/leave")
    public ResponseEntity<Void> leaveRoom(@PathVariable("room-seq") int roomSeq){
        // 방 퇴장
        int userSeq = SecurityUtil.getCurrentUserId();
        service.leaveRoom(roomSeq, userSeq);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @ApiOperation(value = "호스트 위임", notes = "호스트 위임")
    @PostMapping("/{room-seq}/change-host/{other-user-seq}")
    public ResponseEntity<Void> passHost(@PathVariable("room-seq") int roomSeq, @PathVariable("other-user-seq") int otherUserSeq){
        int thisUser = SecurityUtil.getCurrentUserId();

        // 호스트 권한 넘겨주기
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

}
