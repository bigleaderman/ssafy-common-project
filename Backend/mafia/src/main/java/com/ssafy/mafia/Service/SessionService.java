package com.ssafy.mafia.Service;

import com.ssafy.mafia.Repository.SessionRepo;
import io.openvidu.java.client.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SessionService {
    private static final Logger log = LoggerFactory.getLogger(SessionService.class);


    @Autowired
    private SessionRepo repo;

    // openvidu 서버 설정
    private OpenVidu openVidu;
    private String OPENVIDU_URL;
    private String SECRET;

    public SessionService(@Value("${openvidu.secret}") String secret, @Value("${openvidu.url}") String url){
        this.OPENVIDU_URL = url;
        this.SECRET = secret;
        this.openVidu = new OpenVidu(this.OPENVIDU_URL, this.SECRET);
        log.info("OpenVidu 객체가 생성되었습니다.");
    }

    // 비디오 세션 생성
    public void createSession(int roomSeq){
        log.info("room [" + roomSeq + "] " + "비디오 세션 생성 요청");
        if(repo.getSession(roomSeq) != null){
            log.error("room [" + roomSeq + "] " + "이미 세션이 존재합니다.");
            return;
        }

        try{
            // 새로운 세션을 생성한다.
            Session session = this.openVidu.createSession();
            repo.createSession(roomSeq, session);
            log.info("room [" + roomSeq + "] " + "세션이 생성되었습니다.");
        }
        catch (Exception e){
            e.printStackTrace();
            log.error("세션 생성 중 에러 발생");
        }
    }

    // 비디오 세션 입장
    public String joinSession(int roomSeq, int userSeq){
        log.info("room [" + roomSeq + "] " + "user " + userSeq + " 가 세션에 입장을 요청했습니다.");

        // 세션이 존재하는지 확인
        Session session = repo.getSession(roomSeq);
        if (session==null){
            log.error("room [" + roomSeq + "] " + "세션이 없습니다.");
            return null;
        }

        // 커넥션 프로퍼티 생성
        ConnectionProperties connectionProperties =
                new ConnectionProperties.Builder()
                        .type(ConnectionType.WEBRTC)
                        .role(OpenViduRole.PUBLISHER)
                        .build();

        // 세션에 연결할 수 있는 토큰을 발급받는다.
        try {
            String token = session.createConnection(connectionProperties).getToken();
            repo.joinRoom(roomSeq, userSeq, token);
            log.info("room [" + roomSeq + "] " + "user " + userSeq + " - token " + token);
            return token;
        }
        catch (Exception e){
            log.error("room [" + roomSeq + "] " + "방 입장 오류 발생");
            return null;
        }
    }

    // 세션 떠나기
    public void leaveSession(int roomSeq, int userSeq){
        log.info("room [" + roomSeq + "] " + "user " + userSeq + " 가 방을 떠났습니다.");

        if(repo.getSession(roomSeq)==null){
            repo.deleteSession(roomSeq);
            log.info("room [" + roomSeq + "] " + "모든 유저가 떠나 세션이 삭제됩니다.");
        }
    }
}
