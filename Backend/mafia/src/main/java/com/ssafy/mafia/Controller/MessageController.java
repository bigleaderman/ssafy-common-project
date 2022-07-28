package com.ssafy.mafia.Controller;

import com.ssafy.mafia.Model.MessageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MessageController {
    private final SimpMessagingTemplate template;

    @MessageMapping("/lobby")
    public void lobbyChat(MessageDto message){
        template.convertAndSend("/sub/lobby", message);
    }

    @MessageMapping("/room")
    public void roomChat(MessageDto message){
        template.convertAndSend("/sub/room/" + message.getRoomSeq(), message);
    }
}
