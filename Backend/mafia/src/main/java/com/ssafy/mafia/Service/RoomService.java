package com.ssafy.mafia.Service;

import com.mysql.cj.x.protobuf.MysqlxCursor;
import com.ssafy.mafia.Entity.RoomInfo;
import com.ssafy.mafia.Model.RoomInfoDto;
import com.ssafy.mafia.Model.SettingsDto;
import com.ssafy.mafia.Repository.RoomRepo;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduRole;
import io.openvidu.java.client.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoomService {

    private OpenVidu openVidu;
    private String OPENVIDU_URL;
    private String SECRET;

    public RoomService(@Value("${openvidu.secret}") String secret, @Value("${openvidu.url}") String openviduUrl){
        this.OPENVIDU_URL = openviduUrl;
        this.SECRET = secret;
        this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
    }

    @Autowired
    private RoomRepo repo;

    // 전체 방 리스트 조회
    public List<RoomInfoDto> getAllRooms(){
        List<RoomInfo> list = repo.getAllRooms();
        List<RoomInfoDto> result = new ArrayList<>();
        for(RoomInfo room : list) {
            result.add(new RoomInfoDto(room.getRoomSeq(), room.getHostUser().getNickname(), room.getTitle(), room.getCapacity()));
        }
        return result;
    }

    // 방 생성

    public SettingsDto createRoom(){
        // openvidu 역할 설정
        // publisher는 방 삭제 권한을 가짐
        OpenViduRole role = OpenViduRole.PUBLISHER;

        // server
        String serverData = "{\"serverData\": \"" + "test" + "\"}";
        ConnectionProperties connectionProperties = null;

        try {
            Session session = this.openVidu.createSession();
            System.out.println(session.getSessionId());
            String token = session.createConnection(connectionProperties).getToken();
        }
        catch (Exception e){

        }
        return null;
    }

}
