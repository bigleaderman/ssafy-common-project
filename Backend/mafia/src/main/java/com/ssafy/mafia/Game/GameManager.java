package com.ssafy.mafia.Game;


import com.google.gson.JsonObject;
import com.ssafy.mafia.Entity.GameInfo;
import com.ssafy.mafia.Repository.RoomRepo;
import com.ssafy.mafia.Service.GameService;
import com.ssafy.mafia.Service.RoomService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Collections;
import java.util.List;

public class GameManager {

    private static final Logger log = LoggerFactory.getLogger(GameManager.class);

    @Autowired
    private GameService gameService;

    @Autowired
    private RoomRepo roomRepo;

    private GameInfo gameInfo;

    private List<Integer> users;
    private List<String> roles;


    public JsonObject start(int roomSeq) {
        log.info("[게임 매니저] 방 {} 에서 게임 시작 요청", roomSeq);

        this.gameInfo = gameService.getGameSetting(roomSeq);
        users = roomRepo.getAllUsersOfRoom(roomSeq);

        if(users == null){
            log.error("[게임 매니저] 방 {} - 유저 정보가 없어 게임을 시작할 수 없습니다.", roomSeq);
            return null;
        }

        if(roomRepo.getSeatCnt(roomSeq) != users.size()){
            log.error("[게임 매니저] 방 번호({}) - 준비되지 않은 유저가 있습니다.", roomSeq);
            return null;
        }

        // 역할 배정
        int n = roomRepo.getAllUsersOfRoom(roomSeq).size();
        for(int i = 0; i < n && i < gameInfo.getMafiaNum(); i++, n--) roles.add("mafia");
        for(int i = 0; i < n && i < gameInfo.getDoctorNum(); i++, n--) roles.add("doctor");
        for(int i = 0; i < n && i < gameInfo.getPoliceNum(); i++, n--) roles.add("police");
        for(int i = 0; i < n; i++) roles.add("civil");
        Collections.shuffle(roles);

        log.info("[게임 매니저] 방 {} - 역할이 배정되었습니다.", roomSeq);


        // Todo : 게임 시작 신호 return
        JsonObject header = new JsonObject();
        header.addProperty("type", "start");

        JsonObject res = new JsonObject();
        res.add("header", header);
        res.add("data", null);

        log.info("[게임 매니저] 방 {} - 게임 시작 메시지 발송 :: {}", roomSeq, res.toString());

        return res;
    }

}
