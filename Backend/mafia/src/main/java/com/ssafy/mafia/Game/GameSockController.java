package com.ssafy.mafia.Game;

import com.google.gson.JsonObject;
import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.RoomProtocol.GameProgressReq;
import com.ssafy.mafia.auth.jwt.TokenProvider;
import com.ssafy.mafia.auth.service.UserService;
import com.ssafy.mafia.auth.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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

                List<String[]> roles = gameSockService.getAllRoles(roomSeq);

                for(int i = 0; i < roles.size(); i++){
                    template.convertAndSend("/sub/room/" + roomSeq + "/game/" + roles.get(i)[0], gameSockService.getRole(roles.get(i)));
                }

            } catch (Exception e){
                template.convertAndSend("/sub/room/" + roomSeq + "/game", "게임 시작 오류");
                log.error("[Game] 방 {} : 게임 시작 오류", roomSeq);
                e.printStackTrace();
            }
            return;
        }

        if(type.equals("role")){
            log.info("[Game] 방({}) 유저({}) 자신의 role 확인", roomSeq, userSeq);
            try{
                JsonObject jo = gameSockService.getRole(roomSeq, userSeq);
                String nickname = jo.getAsJsonObject("data").get("nickname").toString();
                log.info("[Game] 방({}) 유저({}) role : {}", roomSeq, userSeq, jo.toString());
                template.convertAndSend("/sub/room/" + roomSeq + "/game/" + nickname, jo);
            }
            catch (Exception e){
                log.error("[Game] role 확인 오류");
                e.printStackTrace();
            }
            return;
        }

        if(type.equals("talk")){
            log.info("[Game] 방({}) 유저({}) talk 완료", roomSeq, userSeq);
            if(gameSockService.ready("talk", roomSeq, userSeq)){
                template.convertAndSend("/sub/room/" + roomSeq + "/game", gameSockService.talk(roomSeq));
                log.info("[Game] 방({}) talk 전송");
            }
            return;
        }

        if(type.equals("vote-ready")){
            log.info("[Game] room({}) user({}) 투표 준비", roomSeq, userSeq);
            if(gameSockService.ready("vote-ready", roomSeq, userSeq)){
                template.convertAndSend("/sub/room/" + roomSeq + "/game", gameSockService.voteReady(roomSeq));
                log.info("[Game] room({}) 투표 시작", roomSeq, userSeq);
            }
        }

        if(type.equals("vote")){
            log.info("[Game] room({}) 투표 정보 {} -> {}", payload.getData().getNickname(), payload.getData().getTarget());
            User user = userService.getUserInfo(userSeq);
            template.convertAndSend("/sub/room/" + roomSeq + "/game/" + user.getNickname(), gameSockService.vote(roomSeq, payload.getData()));
        }

        if(type.equals("vote-result")){
            log.info("[Game] room({}) 투표 정보 {} -> {}", payload.getData().getNickname(), payload.getData().getTarget());
        }

        if(type.equals("gameover")){
            log.info("[Game] 방({}) 게임 종료", roomSeq);
        }

        if(type.equals("chat")){
            log.info("[Game] 방({}) 유저({}) 채팅", roomSeq, payload.getData().getNickname());
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
