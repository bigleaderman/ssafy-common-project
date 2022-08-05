package com.ssafy.mafia.Service;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.ssafy.mafia.Model.LobbyProtocol.LobbyData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import springfox.documentation.spring.web.json.Json;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class LobbyMessageService {

    private static final Logger log = LoggerFactory.getLogger(LobbyMessageService.class);

    private Map<String, JsonObject> repo = new ConcurrentHashMap<>();

    // 채팅 메시지
    public JsonObject chat(LobbyData message){
        log.info("로비 채팅 메시지 " + message.toString());

        // header build
        JsonObject header = new JsonObject();
        header.addProperty("type", "chat");

        log.info("로비 헤더 빌드 완료");

        // data build
        JsonObject data = new JsonObject();
        data.addProperty("nickname", message.getNickname());
        data.addProperty("message", message.getMessage());

        log.info("로비 데이터 빌드 완료");

        // response build
        JsonObject response = new JsonObject();
        response.add("header", header);
        response.add("data", data);

        log.info("로비 응답 완료" + response.toString());

        return response;
    }

    // 로비 입장 메시지
    public JsonObject join(LobbyData message){
        log.info("로비 입장 " + message.toString());

        // header build
        JsonObject header = new JsonObject();
        header.addProperty("type", "join");

        // repo에 유저 추가
        JsonObject user = new JsonObject();
        user.addProperty("nickname", message.getMessage());
        user.addProperty("status", "lobby");

        repo.put(message.getNickname(), user);

        // data build
        List<JsonObject> userList = new ArrayList<>(repo.values());
        JsonArray users = new JsonArray();
        for(JsonObject o : userList){
            users.add(o);
        }

        JsonObject data = new JsonObject();
        data.add("users", users);


        // response build
        JsonObject response = new JsonObject();
        response.add("header", header);
        response.add("data", data);

        return response;
    }

    // 유저가 로비를 떠났을 때
    public void leave(String nickname){

    }
}

