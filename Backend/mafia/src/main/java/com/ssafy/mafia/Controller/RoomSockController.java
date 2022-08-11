package com.ssafy.mafia.Controller;

import com.ssafy.mafia.Model.RoomProtocol.RoomMessageDto;
import com.ssafy.mafia.Service.RoomSockService;
import com.ssafy.mafia.auth.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class RoomSockController {
    private final SimpMessagingTemplate template;
    private final RoomSockService roomSockService;

    private static final Logger log = LoggerFactory.getLogger(RoomSockController.class);

    /*
     *
     * ********************************************** *
     *    여기서 부터는 socket 통신을 위한 api 입니다.
     * ********************************************** *
     *
     * */

    @MessageMapping("/room/{room-seq}")
    public void messageControll(@DestinationVariable("room-seq") int roomSeq, @Payload RoomMessageDto message){
        int userSeq = SecurityUtil.getCurrentUserId();
        String type = message.getHeader().getType();



        if(type.equals("join")){
            template.convertAndSend("/sub/room/" + roomSeq, roomSockService.joinRoom(roomSeq, message.getData()).toString());
            template.convertAndSend("/sub/room/" + roomSeq, roomSockService.getUserlist(roomSeq).toString());
            return;
        }

        if(type.equals("leave")){
            template.convertAndSend("/sub/room/" + roomSeq, roomSockService.leaveRoom(roomSeq, message.getData()).toString());
            template.convertAndSend("/sub/room/" + roomSeq, roomSockService.getUserlist(roomSeq).toString());
            return;
        }

        if(type.equals("chat")){
            template.convertAndSend("/sub/room/" + roomSeq, roomSockService.chat(message.getData()).toString());
            return;
        }

        if(type.equals("interact")){
            template.convertAndSend("/sub/room/" + roomSeq, roomSockService.interact(roomSeq, userSeq, message.getData()).toString());
            template.convertAndSend("/sub/room/" + roomSeq, roomSockService.getUserlist(roomSeq).toString());
            return;
        }

        if(type.equals("start")){
//            template.convertAndSend("/sub/room/" + roomSeq, messageService.(message.getData()));
            return;
        }

        if(type.equals("settings")){
            template.convertAndSend("/sub/room/" + roomSeq, roomSockService.setting(roomSeq, message.getData()).toString());
            return;
        }

    }
}
