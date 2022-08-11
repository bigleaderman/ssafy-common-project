package com.ssafy.mafia.Game;

import com.google.gson.JsonObject;
import com.ssafy.mafia.Model.RoomProtocol.GameProgressReq;
import com.ssafy.mafia.auth.util.SecurityUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GameSockController {

    private static final Logger log = LoggerFactory.getLogger(GameSockController.class);

    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private GameSockService gameSockService;

    @MessageMapping("/room/{room-seq}/game")
    public void gameControll(@DestinationVariable("room-seq") int roomSeq, @Payload GameProgressReq request) {
        log.info("[게임 컨트롤러] request data = " + request.toString());
        int userSeq = SecurityUtil.getCurrentUserId();
        String type = request.getHeader().getType();

        if(type == null){
            log.error("[게임 컨트롤러] null request");
            template.convertAndSend("/sub/room/" + roomSeq + "/game", "잘못된 데이터로 요청중입니다.");
            return;
        }

        if(type.equals("start")){
            log.info("[게임 컨트롤러] 방 {} - 게임 시작 요청", roomSeq);
            JsonObject res = gameSockService.start(roomSeq);
            if(res != null)
                template.convertAndSend("/sub/room/" + roomSeq + "/game", res);
            else
                template.convertAndSend("/sub/room/" + roomSeq + "/game", "게임 시작 오류");
            return;
        }

        if(type.equals("day")){
            log.info("[게임 컨트롤러] room({}) user({}) 낮을 시작할 준비가 되었습니다.", roomSeq, userSeq);
        }

        if(type.equals("vote")){
            log.info("[게임 컨트롤러] room({}) user({}) 투표 준비 완료", roomSeq, userSeq);
        }

        if(type.equals("vote-result")){
            log.info("[게임 컨트롤러] room({}) 투표 정보 {} -> {}", request.getData().getNickname(), request.getData().getTarget());
        }

        if(type.equals("gameover")){
            log.info("[게임 컨트롤러] room({}) 게임 강제 종료", roomSeq);
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
