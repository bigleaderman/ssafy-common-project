package com.ssafy.mafia.Model;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.ssafy.mafia.Model.RoomProtocol.RoomDataDto;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Data
@Slf4j
public class RoomManager {
    private Map<Integer, JsonObject> users;
    private int[] seatState;
    private int seatCnt;

    private int roomSeq;

    public RoomManager(){
        users = new ConcurrentHashMap<>();
        seatState = new int[8];
        seatCnt = 0;
    }

    public void addUser(int userSeq, RoomDataDto message){
        if(users.get(userSeq)!=null)
            removeUser(userSeq);

        JsonObject user = new JsonObject();
        user.addProperty("nickname", message.getNickname());
        user.addProperty("status", message.getStatus());
        user.addProperty("color", message.getColor());
        user.addProperty("x", message.getX());
        user.addProperty("y", message.getY());
        users.put(userSeq, user);

    }

    public void removeUser(int userSeq){
        users.remove(userSeq);
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
