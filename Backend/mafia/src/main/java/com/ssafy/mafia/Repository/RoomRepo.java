package com.ssafy.mafia.Repository;


import com.ssafy.mafia.Entity.RoomInfo;
import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.RoomInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.*;

@Repository
@RequiredArgsConstructor
@Transactional
public class RoomRepo {

    // 방별 유저를 위한 map
    private final Map<Integer, List<Integer>> map = new LinkedHashMap<>();

    private final EntityManager em;

    // 전체 방 리스트 조회
    public List<RoomInfo> getAllRooms(){
        return em.createQuery("select r from RoomInfo r", RoomInfo.class).getResultList();
    }

    // 방 신규 생성
    public RoomInfo createRoom(RoomInfoDto roomInfo){

        // 집어넣은 데이터 설정
        RoomInfo entity = new RoomInfo();
        entity.setTitle(roomInfo.getTitle());
        entity.setHostUser(roomInfo.getHostUser());
        entity.setCapacity(roomInfo.getCapacity());

        // DB insert
        em.persist(entity);

        // primary key 생성
        em.flush();

        // 방 생성
        map.put(entity.getRoomSeq(), new ArrayList<>());
        // 방 입장
        joinRoom(entity.getRoomSeq(), roomInfo.getHostUser());
        
        // 데이터 리턴
        return entity;
    }

    // 방 정보 수정
    public RoomInfo modifyRoomInfo(RoomInfoDto roomInfo){
        // 기존의 방 entity 불러오기
        RoomInfo entity = em.find(RoomInfo.class, roomInfo.getRoomSeq());

        // 신규 내용으로 update
        entity.setTitle(roomInfo.getTitle());
        entity.setHostUser(roomInfo.getHostUser());
        entity.setCapacity(roomInfo.getCapacity());

        // DB에 update
        em.merge(entity);

        // update 된 정보 return
        return entity;
    }

    // 방 삭제
    public void deleteRoom(int roomSeq){
        map.remove(roomSeq);
        em.remove(em.find(RoomInfo.class, roomSeq));
    }

    // 방 상세정보 조회
    public RoomInfo getRoomInfo(int roomSeq){
        return em.find(RoomInfo.class, roomSeq);
    }

    // 방 입장
    public void joinRoom(int roomSeq, int userSeq){
        map.get(roomSeq).add(userSeq);
    }

    // 방 퇴장
    public void leavRoom(int roomSeq, int userSeq){
        int idx = map.get(roomSeq).indexOf(userSeq);
        map.get(roomSeq).remove(idx);
    }

    // 방 전체 인원 조회
    public List<Integer> getAllUsersOfRoom(int roomSeq){
        return map.get(roomSeq);
    }


}
