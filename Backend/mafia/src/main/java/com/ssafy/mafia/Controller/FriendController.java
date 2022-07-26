package com.ssafy.mafia.Controller;

import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.FriendDto;
import com.ssafy.mafia.Repository.FriendRepo;
import com.ssafy.mafia.Service.FriendService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/friend")
@RequiredArgsConstructor
public class FriendController {

    private final FriendService friendService;
    //친구 신청
    @PostMapping("/request")
    public ResponseEntity<?> friendRequest(@RequestBody FriendDto friendDto) {
        friendService.friendRequest(friendDto);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    //친구 신청 목록 조회
    @GetMapping("/request/{userSeq}")
    public ResponseEntity<?> checkRequest(@PathVariable("userSeq") int userSeq){
        return new ResponseEntity<List<User>>(friendService.findFriendRequest(userSeq),HttpStatus.OK);
    }
}
