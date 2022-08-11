package com.ssafy.mafia.Controller;

import com.ssafy.mafia.Model.LobbyProtocol.LobbyMessage;
import com.ssafy.mafia.Service.LobbySockService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LobbySockController {

    private final LobbySockService messageService;

    private final SimpMessagingTemplate template;

    @MessageMapping("/lobby")
    public void lobby(@Payload LobbyMessage message){
        String type = message.getHeader().getType();

        if(type.equals("chat")){
            template.convertAndSend("/sub/lobby", messageService.chat(message.getData()).toString());
            return;
        }

        if(type.equals("join")){
            template.convertAndSend("/sub/lobby", message);
            template.convertAndSend("/sub/lobby", messageService.join(message.getData()).toString());
            return;
        }
    }
}
