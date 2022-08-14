package com.ssafy.mafia.Service;


import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.GameInfoDto;
import com.ssafy.mafia.Model.RoomInfoDto;
import com.ssafy.mafia.Model.RoomProtocol.RoomDataDto;
import com.ssafy.mafia.Repository.GameRepo;
import com.ssafy.mafia.Repository.RoomRepo;
import com.ssafy.mafia.auth.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class RoomSockService {

    private final RoomRepo roomRepo;
    private final GameRepo gameRepo;
    private final UserService userService;

    private static final Logger log = LoggerFactory.getLogger(RoomSockService.class);

    // 방 입장 메시지 처리
    public JsonObject joinRoom(int roomSeq, RoomDataDto message){
        log.info("[Room] 입장 :: " + message.toString());

        User user = userService.getUserByNickname(message.getNickname());

        // 유저 방에다 추가
        roomRepo.addUserSock(roomSeq, user.getUserSeq(), message);


        // header객체, data 객체 생성
        JsonObject header = new JsonObject();
        JsonObject data = new JsonObject();

        // 응답 객체 생성
        JsonObject response = new JsonObject();

        // header json build
        header.addProperty("type", "join");

        // data json build
        data.addProperty("nickname", message.getNickname());
        data.addProperty("color", message.getColor());
        data.addProperty("x", message.getX());
        data.addProperty("y", message.getY());
        data.addProperty("isHost", roomRepo.getRoomInfo(roomSeq).getHostUser() == user.getUserSeq());

        // reponse json build
        response.add("header", header);
        response.add("data", data);

        return response;
    }

    // 방 퇴장 메시지 처리
    public JsonObject leaveRoom(int roomSeq, int userSeq){
        log.info("[Room {}] {} 퇴장", roomSeq, userSeq);

        User user = userService.getUserInfo(userSeq);

        // 유저 삭제
        roomRepo.deleteUserSock(roomSeq, userSeq);
        roomRepo.leavRoom(roomSeq, userSeq);

        // header객체, data 객체 생성
        JsonObject header = new JsonObject();
        JsonObject data = new JsonObject();

        // 응답 객체 생성
        JsonObject response = new JsonObject();

        // header json build
        header.addProperty("type", "leave");

        // data json build
        data.addProperty("nickname", user.getNickname());

        // reponse json build
        response.add("header", header);
        response.add("data", data);

        if(roomRepo.getAllUsersOfRoom(roomSeq).size() == 0){
            roomRepo.deleteRoom(roomSeq);
        }

        return response;
    }

    // 방 채팅 메시지 처리
    public JsonObject chat(RoomDataDto message){
        log.info("방 채팅 메시지 : " + message.toString());

        // header객체, data 객체 생성
        JsonObject header = new JsonObject();
        JsonObject data = new JsonObject();

        // 응답 객체 생성
        JsonObject response = new JsonObject();

        // header json build
        header.addProperty("type", "chat");

        // data json build
        data.addProperty("nickname", message.getNickname());
        data.addProperty("message", message.getMessage());

        // reponse json build
        response.add("header", header);
        response.add("data", data);

        return response;
    }

    // Todo : 방에 있는 모든 유저 리스트 반환
    public JsonObject getUserlist(int roomSeq){
        log.info("유저목록 불러오기 요청 " + roomSeq + " 번방");

        // header build
        JsonObject header = new JsonObject();
        header.addProperty("type", "list");

        // user list 불러오기
        Map<Integer, JsonObject> list = roomRepo.getAllUsersOfRoomSock(roomSeq);
        JsonArray users = new JsonArray();

        if(list != null){
            // data build
            list.forEach((k, v)->{
                users.add(v);
            });
        }

        JsonObject data = new JsonObject();
        data.add("users", users);

        // response build
        JsonObject response = new JsonObject();
        response.add("header", header);
        response.add("data", data);

        log.info("유저 목록 불러오기 응답 " + response.toString());

        return response;
    }
    
    // 캐릭터 상호작용 처리
    public JsonObject interact(int roomSeq, int userSeq, RoomDataDto message){
        // ready 상태로 만들기
        if(message.getStatus().equals("ready")){
            log.info("[Room {}] {} ready", roomSeq, message.getNickname());
            roomRepo.seat(roomSeq, Integer.parseInt(message.getChairNum()), userSeq);
        }

        // ready 취소
        if(message.getStatus().equals("stand")){
            log.info("[Room {}] {} stand", roomSeq, message.getNickname());
            roomRepo.stand(roomSeq, Integer.parseInt(message.getChairNum()), userSeq);
        }

        // return data
        JsonObject header = new JsonObject();
        header.addProperty("type", "interact");

        JsonObject data = new JsonObject();
        data.addProperty("x", message.getX());
        data.addProperty("y", message.getY());
        data.addProperty("nickname", message.getNickname());
        data.addProperty("status", message.getStatus());
        data.addProperty("color", message.getColor());

        JsonObject jo = new JsonObject();
        jo.add("header", header);
        jo.add("data", data);

        // list update
        roomRepo.updateUserSock(roomSeq, userSeq, message);
        return jo;
    }

    // 게임 설정 변경 처리
    public JsonObject setting(int roomSeq, RoomDataDto message){
        log.info("게임 설정 변경 " + message.toString());

        // header객체, data 객체 생성
        JsonObject header = new JsonObject();
        JsonObject data = new JsonObject();



        // header json build
        header.addProperty("type", "setting");

        // Data json build
        data.addProperty("title", message.getTitle());
        data.addProperty("capacity", message.getCapacity());
        data.addProperty("mafia", message.getMafia());
        data.addProperty("doctor", message.getDoctor());
        data.addProperty("police", message.getPolice());
        data.addProperty("talkTime", message.getTalkTime());
        data.addProperty("voteTime", message.getVoteTime());
        data.addProperty("nightTime", message.getNightTime());

        // db에 게임 설정 변경된 내용 업데이트
        RoomInfoDto roomInfo = new RoomInfoDto(message);
        roomInfo.setRoomSeq(roomSeq);
        roomInfo.setHostUser(roomRepo.getHostUser(roomSeq));
        roomInfo.setCapacity(roomInfo.getCapacity());
        roomInfo.setTitle(message.getTitle());

        GameInfoDto gameInfo = new GameInfoDto(message);

        roomRepo.modifyRoomInfo(roomInfo);
        gameRepo.setGameInfo(roomSeq, gameInfo);



        // Response json build
        JsonObject response = new JsonObject();
        response.add("header", header);
        response.add("data", data);


        return response;
    }

}
