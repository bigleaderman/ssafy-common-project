package com.ssafy.mafia.Game;


import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.ssafy.mafia.Entity.GameInfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import springfox.documentation.spring.web.json.Json;

import java.util.*;


@Data
@Slf4j
@AllArgsConstructor
public class GameManager {

    private int roomSeq;
    private GameInfo gameInfo;
    private List<Integer> users;
    private List<String> roles;
    private Set<Integer> readyQueue;
    private int readyCnt = 0;

    private Map<Integer, JsonObject> voteResult;

    private String status = "start";

    public GameManager(){
        this.users = new ArrayList<>();
        this.roles = new ArrayList<>();
        this.readyQueue = new HashSet<>();
    }

    public void ready(String status, int userSeq){
        if(readyQueue.contains(userSeq)){
            log.error("[Game] 유저({})은 이미 준비상태 입니다.", userSeq);
            return;
        }
        if(!status.equals(this.status)){
            log.error("[Game] 유저({})의 상태 이상 {} -> {}", userSeq, status, this.status);
            return;
        }

        readyQueue.add(userSeq);
    }

    public boolean isReady(){
        return users.size() == readyCnt;
    }

    public void clear(){
        readyQueue.clear();
    }

    public void clearAll(){
        this.roles.clear();
        this.readyQueue.clear();
        this.readyCnt = 0;
        this.status = "start";
    }

    public JsonObject gameStart(int roomSeq) {
        log.info("[GM] 방 {} 에서 게임 시작 요청", roomSeq);

        if(users == null){
            log.error("[GM] 방 {} - 방에 유저가 없습니다.", roomSeq);
            JsonObject jo = new JsonObject();
            jo.addProperty("error", "방에 유저가 없습니다.");
            return jo;
        }

        if(!isReady()){
            log.error("[GM] 방 {} : 누군가 준비되지 않았습니다.");
            JsonObject jo = new JsonObject();
            jo.addProperty("error", "누군가 준비되지 않았습니다.");
            return jo;
        }

        // 역할 설정
        setRoles();

        // Todo : 게임 시작 신호 return
        JsonObject header = new JsonObject();
        header.addProperty("type", "start");

        JsonObject res = new JsonObject();
        res.add("header", header);
        res.add("data", null);

        log.info("[게임 매니저] 방 {} - 게임 시작 메시지 발송 :: {}", roomSeq, res.toString());

        return res;
    }

    // 역할 정하기
    public void setRoles(){
        roles.clear();
        int n = users.size();
        for(int i = 0; i < n && i < gameInfo.getMafiaNum(); i++, n--) roles.add("mafia");
        for(int i = 0; i < n && i < gameInfo.getDoctorNum(); i++, n--) roles.add("doctor");
        for(int i = 0; i < n && i < gameInfo.getPoliceNum(); i++, n--) roles.add("police");
        for(int i = 0; i < n; i++) roles.add("civil");
        Collections.shuffle(roles);
        log.info("[GM] 방 {} : 역할이 배정되었습니다.", roomSeq);
    }

    public String getRole(int userSeq){
        for(int i = 0; i < users.size(); i++){
            if(users.get(i) == userSeq){
                return roles.get(i);
            }
        }
        return "civil";
    }

    public String getRole(String nickname){
        for(int i = 0; i < users.size(); i++){
            // Todo : 닉네임으로 Role 조회 구현
        }
        return "civil";
    }

    public void vote(int userSeq, String nickname, String target){
        if(voteResult.get(userSeq) != null){
            log.error("[Game] 이미 투표한 유저입니다.");
            return;
        }

        JsonObject jo = new JsonObject();
        jo.addProperty("nickname", nickname);
        jo.addProperty("target", target);
        voteResult.put(userSeq, jo);
    }
}
