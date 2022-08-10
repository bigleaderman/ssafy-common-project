package com.ssafy.mafia.Game;

import com.ssafy.mafia.Model.RoomProtocol.GameProgressReq;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GameSockController {

    private SimpMessagingTemplate template;

    @MessageMapping("/pub/room/{room-seq}/game")
    public void gameControll(@DestinationVariable("room-seq") int roomSeq, @Payload GameProgressReq request) {

    }

    @MessageMapping("/pub/room/{room-seq}/game/mafia")
    public void mafiaControll(@DestinationVariable("room-seq") int roomSeq, @Payload GameProgressReq request) {

    }

    @MessageMapping("/pub/room/{room-seq}/game/police")
    public void policeControll(@DestinationVariable("room-seq") int roomSeq, @Payload GameProgressReq request) {

    }
}
