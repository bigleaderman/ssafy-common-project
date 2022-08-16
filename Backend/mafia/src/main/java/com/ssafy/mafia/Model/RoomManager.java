package com.ssafy.mafia.Model;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.ssafy.mafia.Model.RoomProtocol.RoomDataDto;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Data
@Slf4j
public class RoomManager {
    private Map<Integer, JsonObject> users;
    private int[] seatState;
    private int seatCnt;
    private int roomSeq;
    private LinkedList<Integer> characters;
    private boolean started = false;

    public RoomManager(){
        characters = new LinkedList<>();
        for(int i = 1; i <= 8; i++)
            characters.add(i);
        Collections.shuffle(characters);

        users = new ConcurrentHashMap<>();
        seatState = new int[8];
        seatCnt = 0;
    }

    public int getCharacter(){
        return characters.poll();
    }

    public void returnCharacter(int character){
        characters.add(character);
    }

    public void addUser(int userSeq, RoomDataDto message){
        int character = 0;
        if(users.get(userSeq)!=null) {
            character = users.get(userSeq).get("character").getAsInt();
            users.remove(userSeq);
        }
        else{
            log.info("[Room {}] 새로운 유저 추가", roomSeq);
            character = getCharacter();
        }

        JsonObject user = new JsonObject();
        user.addProperty("nickname", message.getNickname());
        user.addProperty("status", message.getStatus());
        user.addProperty("color", message.getColor());
        user.addProperty("character", character);
        user.addProperty("x", message.getX());
        user.addProperty("y", message.getY());
        users.put(userSeq, user);
    }

    public void removeUser(int userSeq){
        log.info("[Room {}] 유저 제거됨", roomSeq);
        if(users.get(userSeq) != null){
            returnCharacter(users.get(userSeq).get("character").getAsInt());
        }
        users.remove(userSeq);
    }

    public void updateUser(int userSeq, RoomDataDto message){
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
