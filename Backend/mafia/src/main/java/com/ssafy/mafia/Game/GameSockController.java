package com.ssafy.mafia.Game;

import com.google.gson.JsonObject;
import com.ssafy.mafia.Model.RoomProtocol.GameProgressReq;
import com.ssafy.mafia.auth.jwt.TokenProvider;
import com.ssafy.mafia.auth.util.SecurityUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class GameSockController {

    private static final Logger log = LoggerFactory.getLogger(GameSockController.class);

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private GameSockService gameSockService;

    @MessageMapping("/room/{room-seq}/game")
    public void gameControll(@DestinationVariable("room-seq") int roomSeq, StompHeaderAccessor header, @Payload GameProgressReq payload) {
        log.info("[Game] Payload : {}", payload.toString());

        String type, token;
        int userSeq;

        try{
            type = payload.getHeader().getType();
            token = header.getNativeHeader("token").get(0);
            userSeq = Integer.parseInt(tokenProvider.getAuthentication(token).getName());
        }
        catch (Exception e){
            log.error("[Game] 에러가 발생했습니다.");
            e.printStackTrace();
            return;
        }

        if(type == null){
            log.error("[Game] Type null");
            template.convertAndSend("/sub/room/" + roomSeq + "/game", "요청 에러 발생");
            return;
        }

        if(type.equals("start")){
            log.info("[Game] 방 {} - 게임 시작 요청", roomSeq);
            try{
                JsonObject res = gameSockService.start(roomSeq);
                template.convertAndSend("/sub/room/" + roomSeq + "/game", res.toString());
            } catch (Exception e){
                template.convertAndSend("/sub/room/" + roomSeq + "/game", "게임 시작 오류");
                log.error("[Game] 방 {} : 게임 시작 오류", roomSeq);
                e.printStackTrace();
            }
            return;
        }

        if(type.equals("day")){
            log.info("[Game] room({}) user({}) Day 신호 전송", roomSeq, userSeq);

        }

        if(type.equals("vote")){
            log.info("[Game] room({}) user({}) 투표 준비 완료", roomSeq, userSeq);
        }

        if(type.equals("vote-result")){
            log.info("[Game] room({}) 투표 정보 {} -> {}", payload.getData().getNickname(), payload.getData().getTarget());
        }

        if(type.equals("gameover")){
            log.info("[Game] room({}) 게임 강제 종료", roomSeq);
        }

        // Todo : 밤 기능 추가

    }

    @MessageMapping("/pub/room/{room-seq}/game/mafia")
    public void mafiaControll(@DestinationVariable("room-seq") int roomSeq, @Payload GameProgressReq request) {

    }

    @MessageMapping("/pub/room/{room-seq}/game/police")
    public void policeControll(@DestinationVariable("room-seq") int roomSeq, @Payload GameProgressReq request) {

    }
}
