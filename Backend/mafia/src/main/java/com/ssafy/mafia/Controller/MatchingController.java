package com.ssafy.mafia.Controller;


import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.GameInfoDto;
import com.ssafy.mafia.Model.RoomInfoDto;
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


    private List<Integer> redUserList = new ArrayList<Integer>();
    private List<Integer> userList = new ArrayList<Integer>();

    private RoomService roomService;
    private EntityManager em;

    private final SessionService sessionService;

    @MessageMapping("/game-matching")
    public void matching(@Payload MatchingRequset matchingRequset) {
        // red 유저
        if (matchingRequset.getData().getIsRedUser() == 1){

            // connection 요청
            if (matchingRequset.getHeader().getType().equals("connection")) {


                // 대기 queue에 userSeq 넣기
                redUserList.add(matchingRequset.getData().getUserSeq());

                // 방생성
                if (redUserList.size() == 6 ) {
                    //방 생성 로직
                    SettingsDto settingsDto = new SettingsDto(); //Dto생성

                    // RoomDto 기본 setting
                    settingsDto.getRoomInfo().setMatching(true);
                    settingsDto.getRoomInfo().setTitle("matchingGame");
                    settingsDto.getRoomInfo().setHostUser(redUserList.get(0));

                    // 방생성
                    SettingsDto response = roomService.createRoom(settingsDto.getRoomInfo(), settingsDto.getGameInfo());
                    roomService.setHost(response.getRoomInfo().getRoomSeq(), redUserList.get(0));

                    //오픈비두 세션 생성
                    sessionService.createSession(response.getRoomInfo().getRoomSeq());

                    //인원 정보 찾기
                    List<UserInfoResponseDto> userInfoList = new ArrayList<>();
                    for (int i=0; i<6; i++) {
                        User user = em.find(User.class, redUserList.get(i));
                        UserInfoResponseDto userInfoResponseDto = UserInfoResponseDto.convert(user);
                        userInfoList.add(userInfoResponseDto);
                    }

                    //ResponseDto 생성
                    SuccessMatchingResponse successMatchingResponse = new SuccessMatchingResponse();
                    successMatchingResponse.setData(new SuccessMatchingResponseData());
                    successMatchingResponse.setHeader(new MatchingHeader());
                    successMatchingResponse.getHeader().setType("RedUserCompleted");
                    successMatchingResponse.getData().setRoomInfo(response.getRoomInfo());
                    successMatchingResponse.getData().setGameInfo(response.getGameInfo());
                    successMatchingResponse.getData().setUserInfo(userInfoList);
                    template.convertAndSend("/sub/game-matching/", successMatchingResponse);

                    // List 비우기
                    redUserList.clear();


                }
                // 현재 redUserListSize 반환
                else {
                    MatchingResponse matchingResponse = new MatchingResponse();
                    matchingResponse.setHeader(new MatchingHeader());
                    matchingResponse.setData(new MatchingResponseData());
                    matchingResponse.getHeader().setType("RedUserNotCompleted");
                    matchingResponse.getData().setNum(redUserList.size());
                    template.convertAndSend("/sub/game-matching", matchingResponse);

                }
            }
            // disconnection 요청
            else {
                redUserList.remove(matchingRequset.getData().getUserSeq());
                MatchingResponse matchingResponse = new MatchingResponse();
                matchingResponse.setData(new MatchingResponseData());
                matchingResponse.setHeader(new MatchingHeader());
                matchingResponse.getHeader().setType("RedUserNotCompleted");
                matchingResponse.getData().setNum(redUserList.size());
                template.convertAndSend("/sub/game-matching", matchingResponse);
            }
        }
        // 일반 유저
        else {
            if (matchingRequset.getHeader().getType().equals("connection")) {

                userList.add(matchingRequset.getData().getUserSeq());
                System.out.println(userList+"코낵션했을때 유저 리스트");
                System.out.println(userList.size() + "유저리스트 사이즈");
                // 방생성
                if (userList.size() == 6 ) {
                    //방 생성 로직

                    SettingsDto settingsDto = new SettingsDto(); //Dto생성
                    // RoomDto 기본 setting
                    settingsDto.getRoomInfo().setMatching(true);
                    settingsDto.getRoomInfo().setTitle("matchingGame");
                    settingsDto.getRoomInfo().setHostUser(userList.get(0));
                    System.out.println(settingsDto + "세팅Dto");
                    // 방생성
                    SettingsDto response = roomService.createRoom(settingsDto.getRoomInfo(), settingsDto.getGameInfo());
                    roomService.setHost(response.getRoomInfo().getRoomSeq(), userList.get(0));
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
                    template.convertAndSend("/sub/game-matching/", successMatchingResponse);
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
                    template.convertAndSend("/sub/game-matching", matchingResponse);
                }
            }
            // disconnection 요청
            else {
                System.out.println(userList + "디스코넥션했을때 유저 리스트");
                userList.remove(matchingRequset.getData().getUserSeq());
                MatchingResponse matchingResponse = new MatchingResponse();
                matchingResponse.setHeader(new MatchingHeader());
                matchingResponse.setData(new MatchingResponseData());
                matchingResponse.getHeader().setType("GeneralUserNotCompleted");
                matchingResponse.getData().setNum(userList.size());
                template.convertAndSend("/sub/game-matching", matchingResponse);
            }
        }
    }
}
