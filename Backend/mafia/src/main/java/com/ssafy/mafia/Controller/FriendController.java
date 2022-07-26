package com.ssafy.mafia.Controller;

import com.ssafy.mafia.Model.FriendDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/friend")
@RequiredArgsConstructor
public class FriendController {

    //친구 신청
//    @PostMapping("/request")
//    public ResponseEntity<?> friendRequest(@RequestBody FriendDto friendDto) {
//
//    }
}
