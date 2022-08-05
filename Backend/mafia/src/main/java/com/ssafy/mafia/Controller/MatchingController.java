package com.ssafy.mafia.Controller;


import com.ssafy.mafia.Model.RoomInfoDto;
import com.ssafy.mafia.Model.SettingsDto;
import com.ssafy.mafia.Model.matching_connection.MatchingRequset;
import com.ssafy.mafia.Model.matching_connection.MatchingResponse;
import com.ssafy.mafia.Model.matching_connection.MatchingResponseData;
import com.ssafy.mafia.Service.RoomService;
import com.ssafy.mafia.Service.SessionService;
import com.ssafy.mafia.Service.SettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequiredArgsConstructor
public class MatchingController {
    private final SimpMessagingTemplate template;


    private List<Integer> redUserList = new ArrayList<Integer>();
    private List<Integer> userList = new ArrayList<Integer>();

    private final RoomService roomService;

    private final SessionService sessionService;

    private final SettingService settingService;



    @MessageMapping("/game-matching")
    public void matching(@Payload MatchingRequset matchingRequset) {

        // red 유저
        if (matchingRequset.getData().getIsRedUser() == 1){

            // connection 요청
            if (matchingRequset.getHeader().getType() == "connection") {


                // 대기 queue에 userSeq 넣기
                redUserList.add(matchingRequset.getData().getUserSeq());

                // 방생성
                if (redUserList.size() == 6 ) {
                    SettingsDto settingsDto = settingService.setting();
                    settingsDto.getRoomInfo().setHostUser(redUserList.get(0));

                    //방 생성 로직
                     SettingsDto response = roomService.createRoom(settingsDto.getRoomInfo(), settingsDto.getGameInfo());
                    //유저정보 반환

                }
                // 현재 redUserListSize 반환
                else {
                    MatchingResponse matchingResponse = new MatchingResponse();
                    matchingResponse.getData().setUserNum(redUserList.size());
                    matchingResponse.getHeader().setType("RedUserNotCompleted");
                    template.convertAndSend("/sub/game-matching", matchingResponse);
                }
            }
            // disconnection 요청
            else {
                redUserList.remove(matchingRequset.getData().getUserSeq());
                MatchingResponse matchingResponse = new MatchingResponse();
                matchingResponse.getData().setUserNum(redUserList.size());
                matchingResponse.getHeader().setType("RedUserNotCompleted");
                template.convertAndSend("/sub/game-matching", matchingResponse);
            }
        }
        // 일반 유저
        else {
            if (matchingRequset.getHeader().getType() == "connection") {

                // 어떤 큐쓸지 판단하기
                int listSeq = 0;
                while (listSeq < 10) {
                    if (userList.size() != 6){
                        break;
                    }
                    listSeq++;
                }

                userList.add(matchingRequset.getData().getUserSeq());
                // 방생성
                if (userList.size() == 6 ) {
                    //방 생성 로직
                    SettingsDto settingsDto = settingService.setting();
                    settingsDto.getRoomInfo().setHostUser(redUserList.get(0));

                    //방 생성 로직
                    SettingsDto response = roomService.createRoom(settingsDto.getRoomInfo(), settingsDto.getGameInfo());
                    //유저정보 반환


                }
                // 현재 UserListSize 반환
                else {
                    MatchingResponse matchingResponse = new MatchingResponse();
                    matchingResponse.getData().setUserNum(redUserList.size());
                    matchingResponse.getHeader().setType("GeneralUserNotCompleted");
                    template.convertAndSend("/sub/game-matching", matchingResponse);
                }
            }
            // disconnection 요청
            else {
                redUserList.remove(matchingRequset.getData().getUserSeq());
                MatchingResponse matchingResponse = new MatchingResponse();
                matchingResponse.getData().setUserNum(redUserList.size());
                matchingResponse.getHeader().setType("GeneralUserNotCompleted");
                template.convertAndSend("/sub/game-matching", matchingResponse);
            }
        }
    }
}
