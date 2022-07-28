package com.ssafy.mafia.Service;

import com.mysql.cj.x.protobuf.MysqlxCursor;
import com.ssafy.mafia.Entity.GameInfo;
import com.ssafy.mafia.Entity.RoomInfo;
import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.GameInfoDto;
import com.ssafy.mafia.Model.RoomInfoDto;
import com.ssafy.mafia.Model.SettingsDto;
import com.ssafy.mafia.Repository.GameRepo;
import com.ssafy.mafia.Repository.RoomRepo;
import com.ssafy.mafia.Repository.UserRepo;
import io.openvidu.java.client.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.handler.UserRoleAuthorizationInterceptor;

import java.util.ArrayList;
import java.util.List;


/*
*
* 게더룸과 관련된 비즈니스 로직을 처리하는 공간입니다.
* 로그인 한 유저만 RoomService 활용 가능.
*
* */
@Service
public class RoomService {

    @Autowired
    private RoomRepo roomRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private GameRepo gameRepo;



    // 전체 방 리스트 조회
    public List<RoomInfoDto> getAllRooms(){
        List<RoomInfo> list = roomRepo.getAllRooms();
        List<RoomInfoDto> result = new ArrayList<>();
        for(RoomInfo room : list) {
            result.add(new RoomInfoDto(room.getRoomSeq(), room.getHostUser().getNickname(), room.getTitle(), room.getCapacity()));
        }
        return result;
    }

    // 방 생성
    public SettingsDto createRoom(String hostUserSeq, RoomInfoDto roomInfo, GameInfoDto gameInfo){
        // userinfo, roominfo 필요.
        System.out.println("createRoom called");

        // Todo : user정보 가져오기
        User user = null;

        // database에 roomInfo 집어 넣고 roomSeq return 받기
        RoomInfo roomEntity = roomRepo.createRoom(roomInfo);
        roomInfo.setRoomSeq(roomEntity.getRoomSeq());

        // database에 default gameinfo 생성 후 집어넣기
        GameInfo gameEntity = gameRepo.createGameInfo(roomEntity);

        // Todo : 채팅 소켓 생성

        // Todo : 캐릭터 데이터 전송 소켓 생성


        // room id { room, game, 채팅 소켓, 캐릭터 소켓 } 으로 묶기
        SettingsDto response = new SettingsDto();
        response.setRoomInfo(roomInfo);
        response.setGameInfo(gameInfo);

        return response;
    }

    // 방 정보 수정
    public void modifyRoomInfo(RoomInfoDto roomInfo){
        // Todo : 호스트 유저만 방 정보 수정 가능

        roomRepo.modifyRoomInfo(roomInfo);
    }

    // Todo : 방 삭제
    public void deleteRoom(RoomInfoDto roomInfo){

    }

    // 방 입장
    public void joinRoom(String room_seq, String user_seq){

        // user data 조회
        User user = null;
        
        // Todo : 채팅 소켓 연결
        
        // Todo : 캐릭터 데이터 소켓 연결
        
        // Todo : 방 정보 리스트에 유저 추가
        
        // Todo : { room, game, 채팅 소켓, 캐릭터 } 데이터 리턴

    }

    // 방 퇴장
    public void leaveRoom(String room_seq, String user_seq){
        // Todo : 채팅 소켓 연결 해제
        
        // Todo : 캐릭터 데이터 소켓 연결 해제
        
        // Todo : 방 정보 리스트에서 유저 삭제

    }

}
