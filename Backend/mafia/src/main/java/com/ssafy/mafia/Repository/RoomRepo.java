package com.ssafy.mafia.Repository;


import com.ssafy.mafia.Entity.GameInfo;
import com.ssafy.mafia.Entity.RoomInfo;
import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.RoomInfoDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public class RoomRepo {

    @Autowired
    private EntityManager em;

    // 전체 방 리스트 조회
    public List<RoomInfo> getAllRooms(){
        return em.createQuery("select r from RoomInfo r", RoomInfo.class).getResultList();
    }

    // 방 신규 생성
    public RoomInfo createRoom(RoomInfoDto roomInfo){
        // 집어넣은 데이터 설정
        RoomInfo entity = new RoomInfo();
        entity.setTitle(roomInfo.getTitle());
        entity.setHostUser(em.find(User.class, roomInfo.getHostUser()));
        entity.setCapacity(roomInfo.getCapacity());

        // DB insert
        em.persist(entity);

        // primary key 생성
        em.flush();
        
        // 데이터 리턴
        return entity;
    }

    // 방 정보 수정
    public void modifyRoomInfo(RoomInfoDto roomInfo){
        // 기존의 방 entity 불러오기
        RoomInfo entity = em.find(RoomInfo.class, roomInfo.getRoomSeq());

        // 신규 내용으로 update
        entity.setTitle(roomInfo.getTitle());
        entity.setHostUser(em.find(User.class, roomInfo.getHostUser()));
        entity.setCapacity(roomInfo.getCapacity());

        // DB에 update
        em.merge(entity);

        // Todo : update 된 정보 return
    }

    // Todo : 방 삭제
    public void deleteRoom(RoomInfoDto roomInfo){

    }

    // Todo : 방 상세정보 조회

}
