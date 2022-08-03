package com.ssafy.mafia.Repository;

import com.ssafy.mafia.Entity.GameInfo;
import com.ssafy.mafia.Entity.RoomInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@Transactional
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
    public GameInfo getGameInfo(int roomSeq){
        // 방 정보 가져오기
        RoomInfo roomInfo = em.find(RoomInfo.class, roomSeq);

        // 방 정보로 게임 정보 불러오기
        List<GameInfo> datas = em.createQuery("select g from GameInfo g where g.roomInfoSeq=:roomInfo", GameInfo.class)
                .setParameter("roomInfo", roomInfo)
                .getResultList();

        if(datas.size() == 0) return null;
        else return datas.get(0);
    }

    // 게임 정보 삭제
    public void deleteGameInfo(int roomSeq){
        GameInfo entity = getGameInfo(roomSeq);
        em.remove(entity);
    }
}
