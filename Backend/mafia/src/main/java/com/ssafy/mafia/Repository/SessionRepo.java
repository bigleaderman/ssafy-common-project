package com.ssafy.mafia.Repository;

import io.openvidu.java.client.OpenViduRole;
import io.openvidu.java.client.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class SessionRepo {
    private static final Logger log = LoggerFactory.getLogger(SessionRepo.class);

    // 방 seq별 session 객체 저장
    private Map<Integer, Session> roomSessionMap = new ConcurrentHashMap<>();

    // 방 번호 : user 번호 : 토큰
    private Map<Integer, Map<Integer, String>> roomTokensMap = new ConcurrentHashMap<>();

    // 새로 생성된 세션 정보 저장
    public Session createSession(int roomSeq, Session session) {
        if(getSession(roomSeq) == null){
            roomSessionMap.put(roomSeq, session);
            roomTokensMap.put(roomSeq, new ConcurrentHashMap<>());
            return getSession(roomSeq);
        }
        else{
            return null;
        }
    }

    // 방번호로 세션 정보 얻기
    public Session getSession(int roomSeq){
        return roomSessionMap.get(roomSeq);
    }

    // 방의 세션 삭제
    public void deleteSession(int roomSeq){
        try{
//            roomSessionMap.get(roomSeq).close();
        }
        catch (Exception e){
            log.error("세션 close시 에러 발생");
        }

        roomSessionMap.remove(roomSeq);
        roomTokensMap.remove(roomSeq);
    }

    // 비디오 세션 입장
    public void joinRoom(int roomSeq, int userSeq, String token){
        roomTokensMap.get(roomSeq).put(userSeq, token);
    }

    // 세션 퇴장
    public void leaveRoom(int roomSeq, int userSeq){
        roomTokensMap.get(roomSeq).remove(userSeq);
    }
}
