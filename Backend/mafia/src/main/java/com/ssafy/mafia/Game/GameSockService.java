package com.ssafy.mafia.Game;

import com.google.gson.JsonObject;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class GameSockService {
    private Map<Integer, GameManager> roomGameManagerMap = new ConcurrentHashMap<>();

    public void createGameManager(int roomSeq){
        roomGameManagerMap.put(roomSeq, new GameManager());
    }

    public JsonObject start(int roomSeq){
        GameManager gm = roomGameManagerMap.get(roomSeq);
        return gm.start(roomSeq);
    }

    public GameManager getGm(int roomSeq){
        return roomGameManagerMap.get(roomSeq);
    }

    public void endGame(int roomSeq){
        this.roomGameManagerMap.remove(roomSeq);
    }


}
