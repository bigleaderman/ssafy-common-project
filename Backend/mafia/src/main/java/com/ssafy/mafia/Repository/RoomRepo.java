package com.ssafy.mafia.Repository;


import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.ssafy.mafia.Entity.RoomInfo;
import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.RoomInfoDto;
import com.ssafy.mafia.Model.RoomManager;
import com.ssafy.mafia.Model.RoomProtocol.RoomDataDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Repository
@Transactional
@Slf4j
public class RoomRepo {

    // db 접근을 위한 entity manager
    @Autowired
    private EntityManager em;

    // 방별 정보를 담고 있는 map
    private Map<Integer, RoomManager> map = new ConcurrentHashMap<>();


    /*********** 대기방 기능 **************/

    public List<RoomInfo> getAllRooms(){
        return em.createQuery("select r from RoomInfo r", RoomInfo.class).getResultList();
    }

    public RoomInfo createRoom(RoomInfoDto roomInfo){
        // 집어넣을 데이터 설정
        RoomInfo entity = new RoomInfo();
        entity.setTitle(roomInfo.getTitle());
        entity.setCapacity(roomInfo.getCapacity());

        // DB insert
        em.persist(entity);

        // primary key 생성
        em.flush();

        // 방 관리자 생성
        map.put(entity.getRoomSeq(), new RoomManager());
        map.get(entity.getRoomSeq()).setRoomSeq(entity.getRoomSeq());
        
        // 데이터 리턴
        return entity;
    }

    public void setRoomPassword(int roomSeq, String password){
        RoomInfo entity = em.find(RoomInfo.class, roomSeq);
        entity.setPassword(password);
    }

    public void setHostUser(int roomSeq, int userSeq){
        // 호스트 변경
        RoomInfo entity = em.find(RoomInfo.class, roomSeq);
        entity.setHostUser(userSeq);
    }

    public int getHostUser(int roomSeq){
        RoomInfo entity = em.find(RoomInfo.class, roomSeq);
        return entity.getHostUser();
    }

    public RoomInfo modifyRoomInfo(RoomInfoDto roomInfo){
        // 기존의 방 entity 불러오기
        RoomInfo entity = em.find(RoomInfo.class, roomInfo.getRoomSeq());

        // 신규 내용으로 update
        entity.setTitle(roomInfo.getTitle());
        entity.setHostUser(roomInfo.getHostUser());
        entity.setCapacity(roomInfo.getCapacity());

        // update 된 정보 return
        return entity;
    }

    public void deleteRoom(int roomSeq){
        map.remove(roomSeq);
        em.remove(em.find(RoomInfo.class, roomSeq));
    }

    // 방 상세정보 조회
    public RoomInfo getRoomInfo(int roomSeq){
        return em.find(RoomInfo.class, roomSeq);
    }

    // 방 입장
    public void joinRoom(int roomSeq, User user){
        RoomDataDto dummy = new RoomDataDto();
        dummy.setNickname(user.getNickname());
        dummy.setColor("#000000");
        dummy.setStatus("move");
        dummy.setX(350.0);
        dummy.setY(600.0);
        addUserSock(roomSeq, user.getUserSeq(), dummy);
    }


    // 방 퇴장
    public void leavRoom(int roomSeq, int userSeq){
        map.get(roomSeq).removeUser(userSeq);
    }

    // 방 전체 인원 조회
    public Map<Integer, JsonObject> getAllUsersOfRoom(int roomSeq){
        RoomManager rm = map.get(roomSeq);
        if(rm == null){
            log.error("[RoomRepo] 방({})이 없습니다.", roomSeq);
            return null;
        }
        log.info("[RoomRepo] 방({}) 전체 인원 조회 :: {}", roomSeq, rm);
        return map.get(roomSeq).getUsers();
    }


    /*
    * ******************************* *
    * 소켓 통신용
    * ******************************* *
    * */


    public void updateUserSock(int roomSeq, int userSeq, RoomDataDto data){
        map.get(roomSeq).updateUser(userSeq, data);
    }


    // 방에서 유저 삭제
    public void deleteUserSock(int roomSeq, int userSeq){
        this.map.get(roomSeq).removeUser(userSeq);
    }

    // 유저 추가
    public void addUserSock(int roomSeq, int userSeq, RoomDataDto message){
        this.map.get(roomSeq).addUser(userSeq, message);
    }


    public Map<Integer, JsonObject> getAllUsersOfRoomSock(int roomSeq){
        return this.map.get(roomSeq).getUsers();
    }

    // 유저 ready
    public void seat(int roomSeq, int seatNum, int userSeq){
        this.map.get(roomSeq).seat(userSeq, seatNum);
    }

    // 유저 레디 해제
    public void stand(int roomSeq, int seatNum, int userSeq){
        this.map.get(roomSeq).stand(userSeq, seatNum);
    }

    // 남은 좌석 정보 확인
    public int[] getSeatInfo(int roomSeq){
        return this.map.get(roomSeq).getSeatState();
    }

    // 앉은 좌석 수 확인
    public int getSeatCnt(int roomSeq){
        return this.map.get(roomSeq).getSeatCnt();
    }

}
