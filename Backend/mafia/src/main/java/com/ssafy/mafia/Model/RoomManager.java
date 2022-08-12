package com.ssafy.mafia.Model;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.RoomProtocol.RoomDataDto;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

@Data
@Slf4j
public class RoomManager {
    private List<Integer> users;
    private JsonArray roomUser;
    private int[] seatState;
    private int seatCnt;

    private int roomSeq;

    public RoomManager(){
        users = new ArrayList<>();
        roomUser = new JsonArray();
        seatState = new int[8];
        seatCnt = 0;
    }

    public void addUser(User user){
        if(!users.contains(user.getUserSeq())){
            users.add(user.getUserSeq());
            JsonObject userjo = new JsonObject();
            userjo.addProperty("nickname", user.getNickname());
            userjo.addProperty("status", "move");
            userjo.addProperty("color", "black");
            userjo.addProperty("x", 0.0);
            userjo.addProperty("y", 0.0);
            roomUser.add(userjo);
        }
        else
            log.error("[Room] 이미 방에 존재하는 유저 입니다.");
    }

    public void addUser(int userSeq, RoomDataDto message){
        if(!users.contains(userSeq)){
            users.add(userSeq);
            JsonObject user = new JsonObject();
            user.addProperty("nickname", message.getNickname());
            user.addProperty("status", "move");
            user.addProperty("color", message.getColor());
            user.addProperty("x", 0.0);
            user.addProperty("y", 0.0);
            roomUser.add(user);
        }
        else
            log.error("[Room] 이미 방에 존재하는 유저 입니다.");
    }

    public void removeUser(int userSeq){
        for(int i =0 ; i < users.size(); i++){
            if(users.get(i) == userSeq){
                users.remove(i);
                break;
            }
        }
    }

    public void removeUser(RoomDataDto message){
        for(int i = 0; i < roomUser.size(); i++){
            JsonObject o = roomUser.get(i).getAsJsonObject();
            if(o.get("nickname").equals(message.getNickname())){
                users.remove(i);
                break;
            }
        }
    }

    public void seat(int userSeq, int seatNum){
        if(seatState[seatNum] == 0) {
            seatState[seatNum] = userSeq;
            seatCnt++;
        }
    }

    public void stand(int userSeq, int seatNum){
        if(seatState[seatNum] == userSeq){
            seatState[seatNum] = 0;
            seatCnt--;
        }
    }

}
