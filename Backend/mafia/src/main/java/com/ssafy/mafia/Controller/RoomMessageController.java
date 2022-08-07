package com.ssafy.mafia.Controller;

import com.ssafy.mafia.Model.RoomProtocol.RoomMessageDto;
import com.ssafy.mafia.Service.RoomMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class RoomMessageController {
    private final SimpMessagingTemplate template;
    private final RoomMessageService messageService;

    /*
     *
     * ********************************************** *
     *    여기서 부터는 socket 통신을 위한 api 입니다.
     * ********************************************** *
     *
     * */

    @MessageMapping("/room/{room-seq}")
    public void messageControll(@DestinationVariable("room-seq") int roomSeq, @Payload RoomMessageDto message){
        String type = message.getHeader().getType();

        if(type.equals("join")){
            template.convertAndSend("/sub/room/" + roomSeq, messageService.joinRoom(roomSeq, message.getData()).toString());
            template.convertAndSend("/sub/room/" + roomSeq, messageService.getUserlist(roomSeq).toString());
            return;
        }

        if(type.equals("leave")){
            template.convertAndSend("/sub/room/" + roomSeq, messageService.leaveRoom(roomSeq, message.getData()).toString());
            template.convertAndSend("/sub/room/" + roomSeq, messageService.getUserlist(roomSeq).toString());
            return;
        }

        if(type.equals("chat")){
            template.convertAndSend("/sub/room/" + roomSeq, messageService.chat(message.getData()).toString());
            return;
        }

        if(type.equals("interact")){
            template.convertAndSend("/sub/room/" + roomSeq, messageService.interact(roomSeq, message.getData()).toString());
            return;
        }

        if(type.equals("start")){
//            template.convertAndSend("/sub/room/" + roomSeq, messageService.(message.getData()));
            return;
        }

        if(type.equals("settings")){
            template.convertAndSend("/sub/room/" + roomSeq, messageService.setting(roomSeq, message.getData()).toString());
            return;
        }

    }
}
