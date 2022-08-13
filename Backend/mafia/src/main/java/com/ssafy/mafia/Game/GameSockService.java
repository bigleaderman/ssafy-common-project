package com.ssafy.mafia.Game;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.RoomProtocol.GameProgressDataReq;
import com.ssafy.mafia.Repository.GameRepo;
import com.ssafy.mafia.Repository.RoomRepo;
import com.ssafy.mafia.Service.SessionService;
import com.ssafy.mafia.auth.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


@Service
@Slf4j
@RequiredArgsConstructor
public class GameSockService {

    private final RoomRepo roomRepo;
    private final GameRepo gameRepo;
    private final UserService userService;
    private final SessionService sessionService;

    // 방별 게임 매니저
    private Map<Integer, GameManager> gmMap = new ConcurrentHashMap<>();



    public int createGame(int roomSeq){
        if(gmMap.get(roomSeq)!=null)
            return 0;

        log.info("[Game {}] 게임 스타트", roomSeq);
        log.info("[Game {}] 게임 매니저 생성", roomSeq);
        gmMap.put(roomSeq, new GameManager());
        gmMap.get(roomSeq).setGameInfo(gameRepo.getGameInfo(roomSeq));

        log.info("[Game {}] 오픈 비두 세션 생성", roomSeq);
        sessionService.createSession(roomSeq);

        // 방에 있는 유저 전원 참가
        roomRepo.getAllUsersOfRoom(roomSeq).forEach((Integer us)->{
            gmMap.get(roomSeq).addUser(userService.getUserInfo(us));
        });

        // Next Step
        gmMap.get(roomSeq).readyClear();
        gmMap.get(roomSeq).setStatus("session-connect");
        return 1;
    }

    public void removeGame(int roomSeq){
        gmMap.remove(roomSeq);
    }

    public JsonObject sessionConnect(int roomSeq, int userSeq){
        log.info("[Game {}] {} 세션 연결중", roomSeq, userSeq);
        gmMap.get(roomSeq).ready("session-connect", userService.getUserInfo(userSeq));
        if(gmMap.get(roomSeq).isReady()){
            JsonObject jo = new JsonObject();
            jo.addProperty("type","game-start");

            //Next Step
            gmMap.get(roomSeq).readyClear();
            gmMap.get(roomSeq).setStatus("role");
            gmMap.get(roomSeq).initGame();
            return jo;
        }
        return null;
    }

    public List<String[]> assignRole(int roomSeq){
        gmMap.get(roomSeq).assignUserRole();
        return gmMap.get(roomSeq).getUserRole();
    }

    public JsonObject checkRole(int roomSeq, int userSeq){
        log.info("[Game {}] {} 역할 확인중", roomSeq, userSeq);
        gmMap.get(roomSeq).ready("role", userService.getUserInfo(userSeq));
        if(gmMap.get(roomSeq).isReady()){
            JsonObject jo = new JsonObject();
            jo.addProperty("type", "talk-start");

            JsonObject data = new JsonObject();
            data.addProperty("time", gmMap.get(roomSeq).getGameInfo().getTalkTimeoutSec());
            jo.add("data", data);

            // Next Stop
            gmMap.get(roomSeq).readyClear();
            gmMap.get(roomSeq).setStatus("talk-end");
            return jo;
        }
        return null;
    }

    public JsonObject talkEnd(int roomSeq, int userSeq){
        log.info("[Game {}] {} 대화 종료", roomSeq, userSeq);
        gmMap.get(roomSeq).ready("talk-end", userService.getUserInfo(userSeq));
        if(gmMap.get(roomSeq).isReady()){
            JsonObject jo = new JsonObject();
            jo.addProperty("type", "vote-ready");

            JsonObject data = new JsonObject();
            data.addProperty("time", gmMap.get(roomSeq).getGameInfo().getVoteTimeoutSec());
            jo.add("data", data);

            // Next Stop
            gmMap.get(roomSeq).readyClear();
            gmMap.get(roomSeq).setStatus("vote-result");
            return jo;
        }
        return null;
    }

    public void vote(int roomSeq, int userSeq, String target){
        log.info("[Game] {} 한표 획득", target);
        int targetSeq=0;
        if(userService.getUserByNickname(target) != null)
            targetSeq = userService.getUserByNickname(target).getUserSeq();
        gmMap.get(roomSeq).vote(userSeq, targetSeq);
    }

    public JsonObject voteResult(int roomSeq, int userSeq){
        gmMap.get(roomSeq).ready("vote-result", userService.getUserInfo(userSeq));
        if(gmMap.get(roomSeq).isReady()){
            Map<Integer, Integer> vm = gmMap.get(roomSeq).getVote();
            Map<Integer, Integer> vmc = gmMap.get(roomSeq).getVoteCount();
            int alive = gmMap.get(roomSeq).getAlive();

            JsonArray ja = new JsonArray();
            vm.forEach((Integer k, Integer v)->{
                JsonObject jo = new JsonObject();
                jo.addProperty("nickname", userService.getUserInfo(k).getNickname());
                jo.addProperty("target", userService.getUserInfo(v).getNickname());
                ja.add(jo);
            });
            JsonObject data = new JsonObject();
            vmc.forEach((Integer k, Integer yes)->{
                int no = alive - yes;
                if(yes >= no){
                    gmMap.get(roomSeq).kill(k);
                    data.addProperty("dead", userService.getUserInfo(k).getNickname());
                    data.addProperty("role", gmMap.get(roomSeq).getUsers().get(k).getRole());
                }
            });
            data.add("list", ja);

            // Next Step
            gmMap.get(roomSeq).voteClear();
            gmMap.get(roomSeq).readyClear();
            gmMap.get(roomSeq).setStatus("vote-check");

            return data;
        }
        return null;
    }

    public JsonObject voteCheck(int roomSeq, int userSeq) {
        gmMap.get(roomSeq).ready("vote-check", userService.getUserInfo(userSeq));
        if(gmMap.get(roomSeq).isReady()){
            if(gmMap.get(roomSeq).isGameOver()){
                // 게임 오버
                return gameOver(roomSeq);
            }
            else{
                // 밤
                JsonObject jo = new JsonObject();
                jo.addProperty("type", "night");

                JsonObject data = new JsonObject();
                data.addProperty("status", "night");
                data.addProperty("time", gmMap.get(roomSeq).getGameInfo().getNight());

                jo.add("data", data);

                // Next Step
                gmMap.get(roomSeq).readyClear();
                gmMap.get(roomSeq).setStatus("night-check");
                return jo;
            }
        }
        return null;
    }

    public void nightAct(int roomSeq, int userSeq, String target){

    }

    public JsonObject gameOver(int roomSeq){
        log.info("[Game {}] 게임 종료", roomSeq);
        // return value build
        JsonObject jo = new JsonObject();
        JsonObject data = new JsonObject();
        JsonArray roleInfo = new JsonArray();

        jo.addProperty("type", "gameover");
        data.addProperty("winner", gmMap.get(roomSeq).getWinner());

        gmMap.get(roomSeq).getUsers().forEach((k, v)->{
            JsonObject player = new JsonObject();
            player.addProperty("nickname", v.getNickname());
            player.addProperty("role", v.getRole());
            roleInfo.add(player);
        });
        data.add("roleInfo", roleInfo);
        jo.add("data", data);

        // delete game
        removeGame(roomSeq);
        return jo;
    }

}
