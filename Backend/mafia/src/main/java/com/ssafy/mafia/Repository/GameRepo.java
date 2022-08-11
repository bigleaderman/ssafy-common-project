package com.ssafy.mafia.Repository;

import com.ssafy.mafia.Entity.GameInfo;
import com.ssafy.mafia.Entity.RoomInfo;
import com.ssafy.mafia.Game.GameManager;
import com.ssafy.mafia.Model.GameInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Repository
@RequiredArgsConstructor
@Transactional
public class GameRepo {

    private final EntityManager em;

    private Map<Integer, GameManager> gmMap = new ConcurrentHashMap<>();

    // 게임 정보 생성
    public GameInfo createGameInfo(RoomInfo roomInfo){
        // 기본정보로 게임 생성
        GameInfo entity = new GameInfo();

        // 게임 매니저 생성
        GameManager gm = new GameManager();
        gm.setGameInfo(entity);
        gm.setRoomSeq(roomInfo.getRoomSeq());
        gmMap.put(roomInfo.getRoomSeq(), gm);

        // 게임 정보 리턴
        return entity;
    }

    // 게임 정보 조회
    public GameInfo getGameInfo(int roomSeq){
        // 방 정보 가져오기
        RoomInfo roomInfo = em.find(RoomInfo.class, roomSeq);

        // 방 정보로 게임 정보 불러오기
        return gmMap.get(roomSeq).getGameInfo();
    }

    // 게임 정보 수정
    public GameInfo setGameInfo(int roomSeq, GameInfoDto gameInfo){
        GameInfo entity = gmMap.get(roomSeq).getGameInfo();
        entity.setDoctorNum(gameInfo.getDoctorNum());
        entity.setPoliceNum(gameInfo.getPoliceNum());
        entity.setMafiaNum(gameInfo.getMafiaNum());
        entity.setTalkTimeoutSec(gameInfo.getTalkTimeoutSec());
        entity.setVoteTimeoutSec(gameInfo.getVoteTimeoutSec());
        entity.setNight(gameInfo.getNight());
        return entity;
    }

    // 게임 정보 삭제
    public void deleteGameInfo(int roomSeq){
        GameInfo entity = getGameInfo(roomSeq);
        em.remove(entity);
    }

    public GameManager getGameManager(int roomSeq){
        return this.gmMap.get(roomSeq);
    }

    public void removeGame(int roomSeq){
        this.gmMap.remove(roomSeq);
    }
}
