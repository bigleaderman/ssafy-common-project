package com.ssafy.mafia.Repository;


import com.ssafy.mafia.Entity.RoomInfo;
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


}
