package com.ssafy.mafia.Repository;

import com.ssafy.mafia.Entity.GameInfo;
import com.ssafy.mafia.Entity.RoomInfo;
import com.ssafy.mafia.Model.GameInfoDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public class GameRepo {

    @Autowired
    private EntityManager em;

    // 게임 정보 생성
    public GameInfo createGameInfo(RoomInfo roomInfo){
        // 기본정보로 게임방 생성
        GameInfo entity = new GameInfo();

        // 방 번호 설정
        entity.setRoomInfoSeq(roomInfo);

        // db insert
        em.persist(entity);

        // primary key update
        em.flush();

        // 게임 정보 리턴
        return entity;
    }

    // 게임 정보 조회
    public GameInfo getGameInfo(RoomInfo roomInfo){
        List<GameInfo> datas = em.createQuery("select g from GameInfo g where g.roomInfoSeq=:roomSeq", GameInfo.class)
                .setParameter("roomSeq", roomInfo.getRoomSeq())
                .getResultList();
        if(datas.size() == 0) return null;
        else return datas.get(0);
    }
}
