package com.ssafy.mafia.Repository;


import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.ssafy.mafia.Entity.RoomInfo;
import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.RoomInfoDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Repository
@Transactional
public class RoomRepo {

    // db 접근을 위한 entity manager
    @Autowired
    private EntityManager em;

    // 방별 유저를 위한 map
    private final Map<Integer, List<Integer>> map = new ConcurrentHashMap<>();
    private final Map<Integer, JsonArray> roomUserMap = new ConcurrentHashMap<>();

    /*
    *
    * 대기방 관련 기능 구현
    *
    * */

    // 전체 방 리스트 조회
    public List<RoomInfo> getAllRooms(){
        return em.createQuery("select r from RoomInfo r", RoomInfo.class).getResultList();
    }

    // 방 신규 생성
    public RoomInfo createRoom(RoomInfoDto roomInfo){

        // 집어넣은 데이터 설정
        RoomInfo entity = new RoomInfo();
        entity.setTitle(roomInfo.getTitle());
        entity.setCapacity(roomInfo.getCapacity());

        // DB insert
        em.persist(entity);

        // primary key 생성
        em.flush();

        // 방 생성
        map.put(entity.getRoomSeq(), new ArrayList<>());
        roomUserMap.put(entity.getRoomSeq(), new JsonArray());
        
        // 데이터 리턴
        return entity;
    }

    // 방 비밀번호 변경
    public void setRoomPassword(int roomSeq, String password){
        RoomInfo entity = em.find(RoomInfo.class, roomSeq);
        entity.setPassword(password);
    }

    // 호스트 유저 변경
    public void setHostUser(int roomSeq, int userSeq){
        RoomInfo entity = em.find(RoomInfo.class, roomSeq);
        entity.setHostUser(userSeq);
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
        roomUserMap.remove(roomSeq);
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



    /*
    *
    * ******************************* *
    * 소켓 통신용
    * ******************************* *
    *
    * */


    // 방 정보 업데이트
    public void updateRoom(int roomSeq, JsonArray list){
        this.roomUserMap.put(roomSeq, list);
    }

    public JsonArray getAllUsersOfRoomSock(int roomSeq){
        return this.roomUserMap.get(roomSeq);
    }

}
