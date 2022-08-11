package com.ssafy.mafia.Game;

import com.google.gson.JsonObject;
import com.ssafy.mafia.Repository.GameRepo;
import com.ssafy.mafia.Repository.RoomRepo;
import com.ssafy.mafia.auth.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Slf4j
@RequiredArgsConstructor
public class GameSockService {

    private final GameRepo gameRepo;
    private final RoomRepo roomRepo;


    public JsonObject start(int roomSeq){
        GameManager gm = getGm(roomSeq);
        return gm.start(roomSeq);
    }

    public GameManager getGm(int roomSeq){
        return gameRepo.getGameManager(roomSeq);
    }

    public void endGame(int roomSeq){
        this.gameRepo.removeGame(roomSeq);
    }


}
