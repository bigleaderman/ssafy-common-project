package com.ssafy.mafia.Controller;

import com.ssafy.mafia.Model.InviteDto;
import com.ssafy.mafia.Model.MessageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MessageController {
    private final SimpMessagingTemplate template;

    @MessageMapping("/lobby")
    public MessageDto lobbyChat(@Payload MessageDto message){
        template.convertAndSend("/sub/lobby", message);
        return message;
    }

    @MessageMapping("/room/{room-seq}")
    public MessageDto roomChat(@DestinationVariable("room-seq") int roomSeq, @Payload MessageDto message){
        template.convertAndSend("/sub/room/" + roomSeq, message);
        return message;
    }

    @MessageMapping("/invite")
    public void invitingFriend(InviteDto message){
        template.convertAndSend("/sub/invite/" + message.getFriendSeq(), message);
    }


}
