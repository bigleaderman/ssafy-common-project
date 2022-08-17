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
    private Map<Integer, GameInfo> map = new ConcurrentHashMap<>();

    // 게임 정보 생성
    public GameInfo createGameInfo(RoomInfo roomInfo){
        GameInfo entity = new GameInfo();
        map.put(roomInfo.getRoomSeq(), entity);
        return entity;
    }

    // 게임 정보 조회
    public GameInfo getGameInfo(int roomSeq){
        // 방 번호로 게임 정보 불러오기
        return map.get(roomSeq);
    }

    // 게임 정보 수정
    public GameInfo setGameInfo(int roomSeq, GameInfoDto gameInfo){
        GameInfo entity = map.get(roomSeq);
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
        map.remove(roomSeq);
    }

    // 게임 정보 제거
    public void removeGameInfo(int roomSeq){
        this.map.remove(roomSeq);
    }
}
