package com.ssafy.mafia.Game;


import com.google.gson.JsonObject;
import com.ssafy.mafia.Entity.GameInfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


@Data
@Slf4j
@AllArgsConstructor
public class GameManager {

    private GameInfo gameInfo;
    private List<Integer> users;
    private List<String> roles;
    private int roomSeq;

    private int readyQueue[] = new int[5];

    public GameManager(){
        this.users = new ArrayList<>();
        this.roles = new ArrayList<>();
    }


    public JsonObject start(int roomSeq) {
        log.info("[GM] 방 {} 에서 게임 시작 요청", roomSeq);

        if(users == null){
            log.error("[GM] 방 {} - 유저 정보가 없어 게임을 시작할 수 없습니다.", roomSeq);
            return null;
        }

        // Todo : 게임 시작 신호 return
        JsonObject header = new JsonObject();
        header.addProperty("type", "start");

        JsonObject res = new JsonObject();
        res.add("header", header);
        res.add("data", null);

        log.info("[게임 매니저] 방 {} - 게임 시작 메시지 발송 :: {}", roomSeq, res.toString());

        return res;
    }

    public void setRoles(){
        int n = users.size();
        for(int i = 0; i < n && i < gameInfo.getMafiaNum(); i++, n--) roles.add("mafia");
        for(int i = 0; i < n && i < gameInfo.getDoctorNum(); i++, n--) roles.add("doctor");
        for(int i = 0; i < n && i < gameInfo.getPoliceNum(); i++, n--) roles.add("police");
        for(int i = 0; i < n; i++) roles.add("civil");
        Collections.shuffle(roles);
        log.info("[GM] 방 {} : 역할이 배정되었습니다.", roomSeq);
    }

}
