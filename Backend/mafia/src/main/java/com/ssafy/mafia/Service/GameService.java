package com.ssafy.mafia.Service;

import com.ssafy.mafia.Model.GameInfoDto;
import com.ssafy.mafia.Model.RoomInfoDto;
import com.ssafy.mafia.Model.SettingsDto;
import io.openvidu.java.client.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class GameService {


    private OpenVidu openVidu;
    private String OPENVIDU_URL;
    private String SECRET;

    // 게임방 입장
    public GameService(@Value("${openvidu.secret}") String secret, @Value("${openvidu.url}") String openviduUrl){
        this.OPENVIDU_URL = openviduUrl;
        this.SECRET = secret;
        this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
    }
    public String joinGame(){
        // openvidu 역할 설정
        // publisher는 방 삭제 권한을 가짐
        OpenViduRole role = OpenViduRole.PUBLISHER;

        // server
        String serverData = "{\"serverData\": \"" + "test" + "\"}";
        ConnectionProperties connectionProperties =
                new ConnectionProperties.Builder()
                        .type(ConnectionType.WEBRTC)
                        .role(role)
                        .data(serverData)
                        .build();

        try {
            Session session = this.openVidu.createSession();
            System.out.println(session.getSessionId());
            String token = session.createConnection(connectionProperties).getToken();
            return token;
        }
        catch (Exception e){
            return null;
        }
    }

    // 게임 설정 변경
    public GameInfoDto modifyGameSetting(GameInfoDto gameInfo){

        return null;
    }
}
