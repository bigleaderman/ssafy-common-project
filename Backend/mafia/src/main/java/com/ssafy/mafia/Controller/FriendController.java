package com.ssafy.mafia.Controller;

import com.ssafy.mafia.Model.FriendDto;
import com.ssafy.mafia.Model.FriendResponseDto;
import com.ssafy.mafia.Service.FriendService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/friend")
@RequiredArgsConstructor
public class FriendController {

    private final FriendService friendService;
    //친구 신청
    @PostMapping("/request")
    public ResponseEntity<?> friendRequest(@RequestBody FriendDto friendDto){
        if(friendService.friendRequest(friendDto)){
        return new ResponseEntity<Void>(HttpStatus.OK);
            }
        return new ResponseEntity<String>("이미 친구신청을 하였습니다.",HttpStatus.BAD_REQUEST);
    }

    //친구 신청 목록 조회
    @GetMapping("/request-list/{userSeq}")
    public ResponseEntity<?> checkRequest(@PathVariable("userSeq") int userSeq){
        return new ResponseEntity<List<FriendResponseDto>>(friendService.findFriendRequest(userSeq),HttpStatus.OK);
    }

    //친구 목록 조회
    @GetMapping("/friend-list/{userSeq}")
    public ResponseEntity<?> findFriend(@PathVariable("userSeq") int useSeq) {
        return new ResponseEntity<List<FriendResponseDto>>(friendService.findFriend(useSeq),HttpStatus.OK);
    }
    // 친구신청 수락
    @PutMapping("accept/{friendSeq}")
    public ResponseEntity<?> acceptFriend(@PathVariable("friendSeq") int friendSeq) {
        if (friendService.beFriend(friendSeq)){
            return new ResponseEntity<Void>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("이미 친구입니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //친구신청 거절
    @DeleteMapping("accept/refuse/{friendSeq}")
    public ResponseEntity<?> refuseFriend(@PathVariable("friendSeq") int friendSeq) {
        friendService.refuseFriend(friendSeq);
        return new ResponseEntity<String>("친구신청을 거절하였습니다", HttpStatus.OK);
    }

    //친구삭제
    @DeleteMapping("remove/{friendSeq}")
    public ResponseEntity<?> removeFriend(@PathVariable("friendSeq") int friendSeq){
        friendService.removeFriend(friendSeq);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

}
