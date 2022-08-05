package com.ssafy.mafia.Service;

import com.ssafy.mafia.Entity.GameInfo;
import com.ssafy.mafia.Entity.RoomInfo;
import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.GameInfoDto;
import com.ssafy.mafia.Model.RoomInfoDto;
import com.ssafy.mafia.Model.SettingsDto;
import com.ssafy.mafia.Repository.GameRepo;
import com.ssafy.mafia.Repository.RoomRepo;

import com.ssafy.mafia.Model.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    private GameRepo gameRepo;



    // 전체 방 리스트 조회
    public List<RoomInfoResponseDto> getAllRooms(){
        // db에서 모든 방 리스트 조회
        List<RoomInfo> list = roomRepo.getAllRooms();
        
        // response data
        List<RoomInfoResponseDto> result = new ArrayList<>();
        
        // 필요한 정보만 build 후 리턴
        for(RoomInfo room : list) {
            RoomInfoResponseDto dto = new RoomInfoResponseDto(room.getRoomSeq(), room.getHostUser(), room.getTitle(),
                    room.getCapacity(), roomRepo.getAllUsersOfRoom(room.getRoomSeq()).size(), room.getPassword() != null);
            result.add(dto);
        }
        return result;
    }

    // 방 필터로 검색하기
    public List<RoomInfoDto> searchRoomsByFilter(RoomSearchFilterDto filter){
        List<RoomInfo> list = roomRepo.getAllRooms();
        List<RoomInfoDto> result = new ArrayList<>();
        for(RoomInfo room : list) {
            GameInfo game = gameRepo.getGameInfo(room.getRoomSeq());
            if(room.getTitle().equals(filter.getTitle())
                    && room.getCapacity() >= filter.getCapacity()
                    && game.getMafiaNum() == filter.getMafiaNum())
                result.add(new RoomInfoDto(room.getRoomSeq(), room.getHostUser(), room.getTitle(), room.getCapacity()));
        }
        return result;
    }

    // 방 생성
    public SettingsDto createRoom(RoomInfoDto roomInfo, GameInfoDto gameInfo){
        // database에 roomInfo 집어 넣고 roomSeq return 받기
        RoomInfo roomEntity = roomRepo.createRoom(roomInfo);
        roomInfo.setRoomSeq(roomEntity.getRoomSeq());

        // database에 default gameinfo 생성 후 집어넣기
        GameInfo gameEntity = gameRepo.createGameInfo(roomEntity);


        // room id { room, game } 으로 묶기
        SettingsDto response = new SettingsDto();
        response.setRoomInfo(roomInfo);
        response.setGameInfo(gameInfo);

        return response;
    }

    // 호스트 유저 변경
    public void setHost(int roomSeq, int userSeq){
        roomRepo.setHostUser(roomSeq, userSeq);
    }

    // 방 비밀번호 변경
    public void setRoomPassword(int roomSeq, String password){
        roomRepo.setRoomPassword(roomSeq, password);
    }

    // host 없이 방 생성하기
    public SettingsDto createRoom(){
        // Todo : roominfodto response로 변경
        RoomInfoDto roomInfo = new RoomInfoDto();
        GameInfoDto gameInfo = new GameInfoDto();

        // database에 roomInfo 집어 넣고 roomSeq return 받기
        RoomInfo roomEntity = roomRepo.createRoom(roomInfo);
        roomInfo.setRoomSeq(roomEntity.getRoomSeq());

        // database에 default gameinfo 생성 후 집어넣기
        GameInfo gameEntity = gameRepo.createGameInfo(roomEntity);


        // room id { room, game } 으로 묶기
        SettingsDto response = new SettingsDto();
        response.setRoomInfo(roomInfo);
        response.setGameInfo(gameInfo);

        return response;
    }

    // 방에 있는 모든 유저 정보 조회
    public List<Integer> getUsersByRoomSeq(int roomSeq){
        return roomRepo.getAllUsersOfRoom(roomSeq);
    }

    // 방 상세 정보 조회
    public RoomInfoResponseDto getRoomInfo(int roomSeq){
        RoomInfo room = roomRepo.getRoomInfo(roomSeq);
        RoomInfoResponseDto dto = new RoomInfoResponseDto(room.getRoomSeq(), room.getHostUser(), room.getTitle(),
                room.getCapacity(), roomRepo.getAllUsersOfRoom(room.getRoomSeq()).size(), room.getPassword() != null);
        return dto;
    }

    // 방 정보 수정
    public RoomInfoResponseDto modifyRoomInfo(RoomInfoDto roomInfo){
        RoomInfo room =  roomRepo.modifyRoomInfo(roomInfo);
        RoomInfoResponseDto dto = new RoomInfoResponseDto(room.getRoomSeq(), room.getHostUser(), room.getTitle(),
                room.getCapacity(), roomRepo.getAllUsersOfRoom(roomInfo.getRoomSeq()).size(), room.getPassword() != null);
        return dto;
    }

    // 방 삭제
    public void deleteRoom(int roomSeq){
        gameRepo.deleteGameInfo(roomSeq);
        roomRepo.deleteRoom(roomSeq);
    }

    // 방 입장
    public SettingsDto joinRoom(int roomSeq, int userSeq){
        // 방에 유저 추가
        roomRepo.joinRoom(roomSeq, userSeq);
        
        // { roominfo, gameinfo } 데이터 리턴
        return new SettingsDto();
    }

    // 방 퇴장
    public void leaveRoom(int roomSeq, int userSeq){
        // 방 정보 리스트에서 유저 삭제
        roomRepo.leavRoom(roomSeq, userSeq);
    }
}
