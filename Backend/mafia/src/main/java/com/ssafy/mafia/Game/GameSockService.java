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

import java.util.*;
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

    public boolean isDead(int roomSeq, int userSeq){
        return gmMap.get(roomSeq).getUsers().get(userSeq).isDead();
    }

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
        roomRepo.getAllUsersOfRoom(roomSeq).forEach((k, v)->{
            gmMap.get(roomSeq).addUser(userService.getUserInfo(k));
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

    public List<String[]> assignRoles(int roomSeq){
        gmMap.get(roomSeq).assignUserRoles();
        return gmMap.get(roomSeq).getUserRoles();
    }

    public JsonObject checkRoles(int roomSeq, int userSeq){
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

    public String getUserRole(int roomSeq, int userSeq){
        return gmMap.get(roomSeq).getUsers().get(userSeq).getRole();
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
        if(isDead(roomSeq, userSeq)){
            log.error("[Game {}] 죽은자는 말이 없다.", roomSeq);
            return;
        }
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

    public JsonObject nightAct(int roomSeq, int userSeq, String target){
        String role = getUserRole(roomSeq, userSeq);
        if(role.equals("mafia"))
            mafiaAct(roomSeq, userSeq, target);
        if(role.equals("doctor"))
            doctorAct(roomSeq, userSeq, target);
        if(role.equals("police"))
            return policeAct(roomSeq, userSeq, target);
        return null;
    }

    public void mafiaAct(int roomSeq, int userSeq, String target){
        if(isDead(roomSeq, userSeq)){
            log.info("[Game {}] 죽은자는 말이 없다.");
            return;
        }

        final int targetSeq = userService.getUserByNickname(target).getUserSeq();
        if(gmMap.get(roomSeq).getUsers().get(targetSeq).isDead()){
            log.info("[Game {}] 마피아가 죽은 사람을 또죽일려 하네");
            return;
        }
        gmMap.get(roomSeq).getUsers().get(userSeq).setTarget(targetSeq);
    }

    public void doctorAct(int roomSeq, int userSeq, String target){
        if(isDead(roomSeq, userSeq)){
            log.info("[Game {}] 죽은자는 말이 없다.");
            return;
        }

        final int targetSeq = userService.getUserByNickname(target).getUserSeq();
        if(gmMap.get(roomSeq).getUsers().get(targetSeq).isDead()){
            log.info("[Game {}] 이미 죽은 사람은 살릴 수 없다.");
            return;
        }
        gmMap.get(roomSeq).getUsers().get(userSeq).setTarget(targetSeq);
    }

    public JsonObject policeAct(int roomSeq, int userSeq, String target){
        if(isDead(roomSeq, userSeq)){
            log.info("[Game {}] 죽은자는 말이 없다.");
            return null;
        }

        final int targetSeq = userService.getUserByNickname(target).getUserSeq();
        if(gmMap.get(roomSeq).getUsers().get(targetSeq).isDead()){
            log.info("[Game {}] 이미 죽은 사람의 정보를 알아낼 수 없다.");
            return null;
        }

        if(gmMap.get(roomSeq).getUsers().get(userSeq).getTarget() != 0){
            log.info("[Game {}] 경찰은 욕심쟁이야");
            return null;
        }

        // target Role
        String role = getUserRole(roomSeq, targetSeq);

        JsonObject jo = new JsonObject();
        JsonObject data = new JsonObject();
        jo.addProperty("type", "act-result");
        data.addProperty("target", target);
        data.addProperty("role", role);

        jo.add("data", data);

        return jo;
    }

    public JsonObject nightResult(int roomSeq, int userSeq){
        gmMap.get(roomSeq).ready("night-check", userService.getUserInfo(userSeq));
        if(gmMap.get(roomSeq).isReady()){
            JsonObject jo = new JsonObject();
            jo.addProperty("type", "night-result");

            // 죽일 사람
            Set<Integer> tmp = new HashSet<>();
            gmMap.get(roomSeq).getUsers().forEach((k, v)->{
                if(!v.isDead() && v.getRole().equals("mafia")) {
                    tmp.add(v.getTarget());
                }
            });

            // 살릴사람
            gmMap.get(roomSeq).getUsers().forEach((k, v)->{
                if(!v.isDead() && tmp.contains(v.getTarget()) && v.getRole().equals("doctor")) {
                    tmp.remove(v.getTarget());
                }
            });

            // kill
            JsonArray dead = new JsonArray();
            if(tmp.size() > 0){
                tmp.forEach((k)->{
                    dead.add(gmMap.get(roomSeq).getUsers().get(k).getNickname());
                    gmMap.get(roomSeq).kill(k);
                });
            }

            JsonArray alive = new JsonArray();
            gmMap.get(roomSeq).getUsers().forEach((k, v)->{
                if(!v.isDead()) {
                    alive.add(v.getNickname());
                }
            });

            JsonObject data = new JsonObject();
            data.add("dead", dead);
            data.add("alive", alive);

            jo.add("data", data);

            // Next Step
            gmMap.get(roomSeq).readyClear();
            gmMap.get(roomSeq).targetClear();
            gmMap.get(roomSeq).setStatus("night-check");

            log.info("[Game {}] 밤 종료", roomSeq);
            return jo;
        }
        return null;
    }

    public JsonObject nightCheck(int roomSeq, int userSeq){
        gmMap.get(roomSeq).ready("night-check", userService.getUserInfo(userSeq));
        if(gmMap.get(roomSeq).isReady()){
            if(gmMap.get(roomSeq).isGameOver()){
                // 게임 오버
                return gameOver(roomSeq);
            }
            else{
                // 낮
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
        }
        return null;
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
