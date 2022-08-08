package com.ssafy.mafia.Service;


import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.ssafy.mafia.Entity.GameInfo;
import com.ssafy.mafia.Model.GameInfoDto;
import com.ssafy.mafia.Model.RoomInfoDto;
import com.ssafy.mafia.Model.RoomProtocol.RoomDataDto;
import com.ssafy.mafia.Repository.GameRepo;
import com.ssafy.mafia.Repository.RoomRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import springfox.documentation.spring.web.json.Json;

@Service
public class RoomMessageService {

    @Autowired
    private RoomRepo roomRepo;

    @Autowired
    private GameRepo gameRepo;

    private static final Logger log = LoggerFactory.getLogger(RoomMessageService.class);

    // 방 입장 메시지 처리
    public JsonObject joinRoom(int roomSeq, RoomDataDto message){
        log.info("방 입장 유저 데이터 " + message.toString());

        // 유저 방에다 추가
        roomRepo.addUserSock(roomSeq, message);


        // header객체, data 객체 생성
        JsonObject header = new JsonObject();
        JsonObject data = new JsonObject();

        // 응답 객체 생성
        JsonObject response = new JsonObject();

        // header json build
        header.addProperty("type", "leave");

        // data json build
        data.addProperty("nickname", message.getNickname());

        // reponse json build
        response.add("header", header);
        response.add("data", data);

        return response;
    }

    // 방 퇴장 메시지 처리
    public JsonObject leaveRoom(int roomSeq, RoomDataDto message){
        log.info("방 퇴장 유저 데이터 " + message.toString());

        // 유저 삭제
        roomRepo.deleteUserSock(roomSeq, message);

        // header객체, data 객체 생성
        JsonObject header = new JsonObject();
        JsonObject data = new JsonObject();

        // 응답 객체 생성
        JsonObject response = new JsonObject();

        // header json build
        header.addProperty("type", "leave");

        // data json build
        data.addProperty("nickname", message.getNickname());

        // reponse json build
        response.add("header", header);
        response.add("data", data);

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

    // 방에 있는 모든 유저 리스트 반환
    public JsonObject getUserlist(int roomSeq){
        // header build
        JsonObject header = new JsonObject();
        header.addProperty("type", "list");

        // user list 불러오기
        JsonArray users = roomRepo.getAllUsersOfRoomSock(roomSeq);

        // data build
        JsonObject data = new JsonObject();
        data.add("users", users);

        // response build
        JsonObject response = new JsonObject();
        response.add("header", header);
        response.add("data", data);

        return response;
    }
    
    // 캐릭터 상호작용 처리
    public JsonObject interact(int roomSeq, RoomDataDto message){
        log.info("게임 캐릭터 데이터 " + message.toString());


        // header객체, data 객체 생성
        JsonObject header = new JsonObject();
        JsonObject data = new JsonObject();
        JsonArray users = roomRepo.getAllUsersOfRoomSock(roomSeq);

        // 응답 객체 생성
        JsonObject response = new JsonObject();

        // header json build
        header.addProperty("type", "list");

        // data json build
        for(int i = 0; i < users.size(); i++){
            JsonObject o = users.get(i).getAsJsonObject();
            if(o.get("nickname").equals(message.getNickname())){
                JsonObject user = new JsonObject();
                user.addProperty("nickname", message.getNickname());
                user.addProperty("status", message.getStatus());
                user.addProperty("color", message.getColor());
                user.addProperty("x", message.getX());
                user.addProperty("y", message.getY());

                users.remove(i);
                users.add(data);
                break;
            }
        }
        roomRepo.updateRoom(roomSeq, users);
        data.add("users", users);


        // reponse json build
        response.add("header", header);
        response.add("data", data);

        return response;
    }

    // Todo : 게임 설정 변경 처리
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
