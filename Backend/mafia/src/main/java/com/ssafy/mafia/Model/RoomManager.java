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

    public void addUser(int userSeq, RoomDataDto message){
        if(!users.contains(userSeq)){
            users.add(userSeq);
            JsonObject user = new JsonObject();
            user.addProperty("nickname", message.getNickname());
            user.addProperty("status", message.getStatus());
            user.addProperty("color", message.getColor());
            user.addProperty("x", message.getX());
            user.addProperty("y", message.getY());
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

    public void updateUser(int userSeq, RoomDataDto message){
        removeUser(userSeq);
        addUser(userSeq, message);
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
