package com.ssafy.mafia.Game;

import com.google.gson.JsonObject;
import com.ssafy.mafia.Model.RoomProtocol.GameProgressReq;
import com.ssafy.mafia.auth.jwt.TokenProvider;
import com.ssafy.mafia.auth.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
public class GameSockController {
    private final TokenProvider tokenProvider;
    private final SimpMessagingTemplate template;
    private final GameSockService gameSockService;
    private final UserService userService;

    @MessageMapping("/room/{room-seq}/game")
    public void gameControll(@DestinationVariable("room-seq") int roomSeq, StompHeaderAccessor header, @Payload GameProgressReq payload) {
        log.info("[Game] Payload : {}", payload.toString());

        final String dest = "/sub/room/"+roomSeq+"/game";
        final String type, token;
        final int userSeq;

        try{
            // Message Type Check
            type = payload.getType();
            token = header.getNativeHeader("token").get(0);
            // 토큰 유효성 검사
            userSeq = Integer.parseInt(tokenProvider.getAuthentication(token).getName());
        }
        catch (Exception e){
            log.error("[Game] 에러가 발생했습니다.");
            e.printStackTrace();
            return;
        }

        /* * * Handler * * */
        if(type.equals("ready")){
            if(gameSockService.createGame(roomSeq)==1){
                JsonObject jo = new JsonObject();
                jo.addProperty("type", "session-created");
                template.convertAndSend(dest, jo.toString());
            }
        }

        if(type.equals("session-connect")){
            JsonObject jo = gameSockService.sessionConnect(roomSeq, userSeq);
            if(jo != null){
                log.info("[Game {}] 세션 연결 완료", roomSeq);
                template.convertAndSend(dest, jo.toString());

                List<String[]> list = gameSockService.assignRoles(roomSeq);
                for(String[] info : list){
                    String nickname = info[0];
                    String role = info[1];

                    JsonObject res = new JsonObject();
                    res.addProperty("type", "role");

                    JsonObject data = new JsonObject();
                    data.addProperty("role", role);

                    res.add("data", data);
                    template.convertAndSend(dest +"/"+nickname, res.toString());
                }
            }
        }

        if(type.equals("role")){
            JsonObject jo = gameSockService.checkRoles(roomSeq, userSeq);
            if(jo != null){
                log.info("[Game {}] 낮 시작", roomSeq);
                template.convertAndSend(dest, jo.toString());
            }
        }

        if(type.equals("talk-end")){
            JsonObject jo = gameSockService.talkEnd(roomSeq, userSeq);
            if(jo!=null){
                log.info("[Game {}] 투표 시작", roomSeq);
                template.convertAndSend(dest, jo.toString());
            }
        }

        if(type.equals("vote")){
            gameSockService.vote(roomSeq, userSeq, payload.getData().getTarget());
            template.convertAndSend(dest, userService.getUserInfo(userSeq).getNickname() + "투표완료");
        }

        if(type.equals("vote-result")){
            JsonObject data = gameSockService.voteResult(roomSeq, userSeq);
            if(data != null){
                log.info("[Game {}] 투표 결과 확인", roomSeq);
                JsonObject jo = new JsonObject();
                jo.addProperty("type", "vote-result");
                template.convertAndSend(dest, jo.toString());
            }
        }

        if(type.equals("vote-check")){
            JsonObject jo = gameSockService.voteCheck(roomSeq, userSeq);
            if(jo != null){
                log.info("[Game {}] 투표 결과 확인 완료");
                template.convertAndSend(dest , jo.toString());
            }
        }

        if(type.equals("night-act")){
            JsonObject jo = gameSockService.nightAct(roomSeq, userSeq, payload.getData().getTarget());
            if(jo != null){
                template.convertAndSend(dest + "/" + userService.getUserInfo(userSeq).getNickname(), jo.toString());
            }
        }

        if(type.equals("night-check")){
            JsonObject jo = gameSockService.nightCheck(roomSeq, userSeq);
            if(jo != null){
                log.info("[Game {}] 낮 시작", roomSeq);
                template.convertAndSend(dest, jo.toString());
            }
        }
    }

    @MessageMapping("/room/{room-seq}/game/mafia")
    public void mafiaControll(@DestinationVariable("room-seq") int roomSeq, @Payload GameProgressReq request) {
        template.convertAndSend("/sub/room/{room-seq}/game/mafia", request);
    }

    @MessageMapping("/room/{room-seq}/game/police")
    public void policeControll(@DestinationVariable("room-seq") int roomSeq, @Payload GameProgressReq request) {

    }
}
