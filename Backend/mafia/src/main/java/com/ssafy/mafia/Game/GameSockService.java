package com.ssafy.mafia.Game;

import com.google.gson.JsonObject;
import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.RoomProtocol.GameProgressDataReq;
import com.ssafy.mafia.Repository.GameRepo;
import com.ssafy.mafia.auth.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@Slf4j
@RequiredArgsConstructor
public class GameSockService {

    private final GameRepo gameRepo;

    private final UserService userService;


    public JsonObject start(int roomSeq){
        GameManager gm = getGm(roomSeq);
        gm.setStatus("talk");
        return gm.gameStart(roomSeq);
    }

    public List<String[]> getAllRoles(int roomSeq){
        GameManager gm = getGm(roomSeq);

        List<Integer> users =  gm.getUsers();
        List<String> roles = gm.getRoles();

        // userNickname, Role 페어로 return
        List<String[]> list = new ArrayList<>();

        for(int i = 0; i < users.size(); i++){
            User user = userService.getUserInfo(users.get(i));
            list.add(new String[]{user.getNickname(),roles.get(i)});
        }

        return list;
    }

    public JsonObject getRole(int roomSeq, int userSeq){
        String role = getGm(roomSeq).getRole(userSeq);
        User user = userService.getUserInfo(userSeq);
        return getRole(new String[]{user.getNickname(), role});
    }

    public JsonObject getRole(String nickname, String role){
        JsonObject header = new JsonObject();
        header.addProperty("type", "role");

        JsonObject data = new JsonObject();
        data.addProperty("nickname", nickname);
        data.addProperty("role", role);

        JsonObject res = new JsonObject();
        res.add("header", header);
        res.add("data", data);

        return res;
    }

    public JsonObject getRole(String[] userRole){
        return getRole(userRole[0], userRole[1]);
    }

    public JsonObject getRole(int roomSeq, String nickname){
        User user = userService.getUserByNickname(nickname);
        return getRole(roomSeq, user.getUserSeq());
    }

    public GameManager getGm(int roomSeq){
        return gameRepo.getGameManager(roomSeq);
    }

    public void endGame(int roomSeq){
        this.gameRepo.removeGame(roomSeq);
    }

    public boolean ready(String status, int roomSeq, int userSeq){
        GameManager gm = getGm(roomSeq);
        gm.ready(status, userSeq);
        return gm.isReady();
    }

    public boolean ready(String status, int roomSeq, String nickname){
        User user = userService.getUserByNickname(nickname);
        return ready(status, roomSeq, user.getUserSeq());
    }

    public JsonObject talk(int roomSeq){
        GameManager gm = getGm(roomSeq);
        gm.setStatus("vote-ready");

        JsonObject header = new JsonObject();
        header.addProperty("type", "talk");

        JsonObject data = new JsonObject();
        data.addProperty("time", gm.getGameInfo().getTalkTimeoutSec());

        JsonObject res = new JsonObject();
        res.add("header", header);
        res.add("data", data);

        return res;
    }

    public JsonObject voteReady(int roomSeq){
        GameManager gm = getGm(roomSeq);
        gm.setStatus("vote");
        gm.clear();

        JsonObject header = new JsonObject();
        header.addProperty("type", "vote-ready");

        JsonObject data = new JsonObject();
        data.addProperty("time", gm.getGameInfo().getVoteTimeoutSec());

        JsonObject res = new JsonObject();
        res.add("header", header);
        res.add("data", data);

        return res;
    }

    public JsonObject vote(int roomSeq, GameProgressDataReq payload){
        User user = userService.getUserByNickname(payload.getNickname());

        GameManager gm = getGm(roomSeq);
        gm.vote(user.getUserSeq(), user.getNickname(), payload.getTarget());

        JsonObject header = new JsonObject();
        header.addProperty("type", "vote");

        JsonObject data = new JsonObject();
        data.addProperty("nickname", user.getNickname());
        data.addProperty("target", payload.getTarget());

        JsonObject res = new JsonObject();
        res.add("header", header);
        res.add("data", data);

        return res;
    }

    public JsonObject voteResult(int roomSeq){
        GameManager gm = getGm(roomSeq);
        return null;
    }




}
