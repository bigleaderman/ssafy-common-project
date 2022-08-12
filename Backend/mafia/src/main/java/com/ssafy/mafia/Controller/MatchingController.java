package com.ssafy.mafia.Controller;


import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.GameInfoDto;
import com.ssafy.mafia.Model.RoomInfoDto;
import com.ssafy.mafia.Model.RoomInfoResponseDto;
import com.ssafy.mafia.Model.SettingsDto;
import com.ssafy.mafia.Model.matching_connection.*;
import com.ssafy.mafia.Service.RoomService;
import com.ssafy.mafia.Service.SessionService;
import com.ssafy.mafia.auth.controller.dto.UserInfoResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequiredArgsConstructor
public class MatchingController {
    private final SimpMessagingTemplate template;

    private List<Integer> userList = new ArrayList<Integer>();

    private final RoomService roomService;
    private final EntityManager em;

    private final SessionService sessionService;

    @MessageMapping("/game-matching-user")
    public void matching(@Payload MatchingRequset matchingRequset) {
        // 일반 유저
        if (matchingRequset.getHeader().getType().equals("connection")) {

            userList.add(matchingRequset.getData().getUserSeq());
            // 방생성
            if (userList.size() == 6 ) {
                //방 생성 로직

                SettingsDto settingsDto = new SettingsDto(); //Dto생성
                // RoomDto 기본 setting
                settingsDto.getRoomInfo().setMatching(true);
                settingsDto.getRoomInfo().setTitle("matchingGame");
                settingsDto.getRoomInfo().setHostUser(userList.get(0));
                settingsDto.getRoomInfo().setPassword("matching");
                settingsDto.setRoomResponse(new RoomInfoResponseDto());
                System.out.println(settingsDto + "세팅Dto");
                // 방생성
                SettingsDto response = roomService.createRoom(settingsDto.getRoomInfo(), settingsDto.getGameInfo());
                roomService.setHost(response.getRoomInfo().getRoomSeq(), userList.get(0));
                roomService.setRoomPassword(response.getRoomInfo().getRoomSeq(), response.getRoomInfo().getPassword());
                System.out.println(response + "응답어떻게 받아오는지");
                //오픈비두 세션 생성
                sessionService.createSession(response.getRoomInfo().getRoomSeq());

                //인원 정보 찾기
                List<UserInfoResponseDto> userInfoList = new ArrayList<>();
                for (int i=0; i<6; i++) {
                    User user = em.find(User.class, userList.get(i));
                    UserInfoResponseDto userInfoResponseDto = UserInfoResponseDto.convert(user);
                    userInfoList.add(userInfoResponseDto);

                //ResponseDto 생성
                SuccessMatchingResponse successMatchingResponse = new SuccessMatchingResponse();
                successMatchingResponse.setHeader(new MatchingHeader());
                successMatchingResponse.setData(new SuccessMatchingResponseData());
                successMatchingResponse.getHeader().setType("GeneralUserCompleted");
                successMatchingResponse.getData().setRoomInfo(response.getRoomInfo());
                successMatchingResponse.getData().setGameInfo(response.getGameInfo());
                successMatchingResponse.getData().setUserInfo(userInfoList);
                System.out.println(successMatchingResponse + "총응답");
                template.convertAndSend("/sub/game-matching-user", successMatchingResponse);
                // List 비우기
                userList.clear();
                }
            }
            // 현재 UserListSize 반환
            else {
                MatchingResponse matchingResponse = new MatchingResponse();
                matchingResponse.setHeader(new MatchingHeader());
                matchingResponse.setData(new MatchingResponseData());
                matchingResponse.getHeader().setType("GeneralUserNotCompleted");
                matchingResponse.getData().setNum(userList.size());
                template.convertAndSend("/sub/game-matching-user", matchingResponse);
            }
        }
        // disconnection 요청
        else {
            System.out.println(userList + "디스코넥션했을때 유저 리스트");
            userList.remove(userList.indexOf(matchingRequset.getData().getUserSeq()));
            MatchingResponse matchingResponse = new MatchingResponse();
            matchingResponse.setHeader(new MatchingHeader());
            matchingResponse.setData(new MatchingResponseData());
            matchingResponse.getHeader().setType("GeneralUserNotCompleted");
            matchingResponse.getData().setNum(userList.size());
            template.convertAndSend("/sub/game-matching-user", matchingResponse);
       }
    }
}
