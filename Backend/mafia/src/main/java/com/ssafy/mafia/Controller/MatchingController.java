package com.ssafy.mafia.Controller;


import com.ssafy.mafia.Model.matching_connection.MatchingRequset;
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
    



    @MessageMapping("/game-matching")
    public void matching(@Payload MatchingRequset matchingRequset) {

        // red 유저
        if (matchingRequset.getMatchingBody().getIsRedUser() == 1){

            // connection 요청
            if (matchingRequset.getMatchingHeader().getType() == "connection") {


                // 대기 queue에 userSeq 넣기
                redUserList.add(matchingRequset.getMatchingBody().getUserSeq());

                // 방생성
                if (redUserList.size() == 6 ) {
                    //방 생성 로직

                }
                // 현재 redUserListSize 반환
                else {
                    template.convertAndSend("/sub/game-matching", redUserList.size());
                }
            }
            // disconnection 요청
            else {
                redUserList.remove(matchingRequset.getMatchingBody().getUserSeq());
                template.convertAndSend("/sub/game-matching", redUserList.size());
            }
        }
        // 일반 유저
        else {
            if (matchingRequset.getMatchingHeader().getType() == "connection") {

                // 어떤 큐쓸지 판단하기
                int listSeq = 0;
                while (listSeq < 10) {
                    if (userList.size() != 6){
                        break;
                    }
                    listSeq++;
                }

                userList.add(matchingRequset.getMatchingBody().getUserSeq());
                // 방생성
                if (userList.size() == 6 ) {
                    //방 생성 로직


                }
                // 현재 UserListSize 반환
                else {
                    template.convertAndSend("/sub/game-matching", userList.size());
                }
            }
            // disconnection 요청
            else {
                redUserList.remove(matchingRequset.getMatchingBody().getUserSeq());
                template.convertAndSend("/sub/game-matching", userList.size());
            }
        }
    }
}
