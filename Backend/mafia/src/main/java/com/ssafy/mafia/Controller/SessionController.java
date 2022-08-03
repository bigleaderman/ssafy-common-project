package com.ssafy.mafia.Controller;

import com.ssafy.mafia.auth.util.SecurityUtil;
import io.openvidu.java.client.*;
import io.swagger.annotations.Api;
import io.swagger.models.Response;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/video-session")
@Api(tags = "오픈비두 세션")
public class SessionController {

    private static final Logger log = LoggerFactory.getLogger(SessionController.class);

    private OpenVidu openVidu;

    // 방 seq별 session 객체 저장
    private Map<Integer, Session> roomSessionMap = new ConcurrentHashMap<>();

    // openvidu 서버 설정
    private String OPENVIDU_URL;
    private String SECRET;

    public SessionController(@Value("${openvidu.secret}") String secret, @Value("${openvidu.url}") String url){
        this.OPENVIDU_URL = url;
        this.SECRET = secret;
        this.openVidu = new OpenVidu(this.OPENVIDU_URL, this.SECRET);
        log.info("오픈비두 객체 생성됨");
    }


    @GetMapping("/{room-seq}")
    public ResponseEntity<SessionResponse> joinSession(@PathVariable("room-seq") int roomSeq){

        SessionResponse res = new SessionResponse();
        
        // 커넥션 프로퍼티 생성
        ConnectionProperties connectionProperties =
                new ConnectionProperties.Builder()
                        .type(ConnectionType.WEBRTC)
                        .role(OpenViduRole.PUBLISHER)
                        .build();

        // 세션이 존재하는지 확인
        Session session = this.roomSessionMap.get(roomSeq);
        if (session==null){
            log.debug("없는 세션에 접근했습니다.");
            return new ResponseEntity<SessionResponse>(res, HttpStatus.BAD_REQUEST);
        }

        try{
            // 세션에 연결할 수 있는 토큰을 발급받는다.
            String token = session.createConnection(connectionProperties).getToken();

            // 리스폰트 데이터에 방 번호와, 토큰 값을 넘겨준다.
            res.setRoomSeq(roomSeq);
            res.setToken(token);
        }
        catch (Exception e){
            e.printStackTrace();
            log.debug("세션 접근 중 에러 발생");
            return new ResponseEntity<SessionResponse>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<SessionResponse>(res, HttpStatus.OK);
    }


    @PostMapping("/{room-seq}")
    public ResponseEntity<Void> createSession(@PathVariable("room-seq") int roomSeq){
        // 방에 이미 세션이 존재한다면 만들 필요가 없다.
        if(roomSessionMap.get(roomSeq) != null){
            return new ResponseEntity<Void>(HttpStatus.ALREADY_REPORTED);
        }

        try{
            // 새로운 세션을 생성한다.
            Session session = this.openVidu.createSession();
            roomSessionMap.put(roomSeq, session);
        }
        catch (Exception e){
            e.printStackTrace();
            log.debug("세션 생성 중 에러 발생");
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PutMapping("/{room-seq}")
    public ResponseEntity<Void> leaveSession(@RequestBody SessionResponse req) {
        return null;
    }



    @Data
    class SessionResponse {
        private int roomSeq;
        private String token;
    }

}
