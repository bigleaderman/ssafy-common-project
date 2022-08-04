package com.ssafy.mafia.Controller;

import com.ssafy.mafia.Model.FriendDto;
import com.ssafy.mafia.Model.FriendResponseDto;
import com.ssafy.mafia.Service.FriendService;
import com.ssafy.mafia.auth.util.SecurityUtil;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Api(value = "FriendController V1", tags = {"친구관련기능"})
@RestController
@RequestMapping("/api/user/friend")
@RequiredArgsConstructor
public class FriendController {

    private final FriendService friendService;
    //친구 신청
    @ApiOperation(value = "친구신청", notes = "Friend 테이블에 새로운 친구관계 데이터를 생성한다")
    @PostMapping("/request")
    public ResponseEntity<?> friendRequest(@RequestBody @ApiParam(value = "대상유저 id", required = true) int friendSeq){
        int userSeq = SecurityUtil.getCurrentUserId();
        FriendDto friendDto = new FriendDto();
        friendDto.setFromUser(userSeq);
        friendDto.setToUser(friendSeq);

        try {
            if(friendService.friendRequest(friendDto)){
            return new ResponseEntity<Void>(HttpStatus.OK);
                }
        }catch (NullPointerException e){
            e.printStackTrace();
            return new ResponseEntity<String>("잘못된 요청입니다.",HttpStatus.BAD_REQUEST);}

        return new ResponseEntity<String>("이미 친구신청을 하였습니다.",HttpStatus.BAD_REQUEST);
    }

    //친구 신청 목록 조회


    @ApiOperation(value = "친구신청 목록조회", notes = "요청 회원을 대상으로한 친구신청의 목록을 반환한다")
    @GetMapping("/request-list")
    public ResponseEntity<List<FriendResponseDto>> checkRequest(){
        int userSeq = SecurityUtil.getCurrentUserId();

        return new ResponseEntity<List<FriendResponseDto>>(friendService.findFriendRequest(userSeq),HttpStatus.OK);
    }

    //친구 목록 조회
    @ApiOperation(value = "친구목록 조회", notes = "친구신청을 수락한 유저들의 목록을 반환한다", response = Map.class)
    @GetMapping("/friend-list")
    public ResponseEntity<List<FriendResponseDto>> findFriend() {
        int userSeq = SecurityUtil.getCurrentUserId();
        return new ResponseEntity<List<FriendResponseDto>>(friendService.findFriend(userSeq),HttpStatus.OK);
    }
    // 친구신청 수락
    @ApiOperation(value = "친구신청 수락", notes = "Frined 테이블에 해당 데이터에서 is_accept컬럼을 true변환 후 양방향 데이터를 생성한다")
    @PutMapping("accept/{friendSeq}")
    public ResponseEntity<?> acceptFriend(@PathVariable("friendSeq")@ApiParam(value = "해당 친구신청데이터의 Friend 테이블의 pk", required = true) int friendSeq) {
        try {
            if (friendService.beFriend(friendSeq)){
                return new ResponseEntity<Void>(HttpStatus.OK);
            }
            else {
                return new ResponseEntity<String>("이미 친구입니다.", HttpStatus.BAD_REQUEST);
            }
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("잘못된 요청입니다.",HttpStatus.BAD_REQUEST);
        }
    }

    //친구신청 거절
    @ApiOperation(value = "친구신청 거절", notes = "Friend 테이블에서 해당 데이터를 삭제한다")
    @DeleteMapping("accept/refuse/{friendSeq}")
    public ResponseEntity<?> refuseFriend(@PathVariable("friendSeq")@ApiParam(value = "해당 친구신청데이터의 Friend 테이블의 pk", required = true) int friendSeq) {
        try {
            friendService.refuseFriend(friendSeq);
            return new ResponseEntity<String>("친구신청을 거절하였습니다", HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("잘못된 요청입니다.",HttpStatus.BAD_REQUEST);
        }
    }

    //친구삭제
    @ApiOperation(value = "친구삭제", notes = "Friend 테이블에서 해당 데이터 및 해당 데이터와 양방향 관계의 데이터를 삭제한다")
    @DeleteMapping("remove/{friendSeq}")
    public ResponseEntity<?> removeFriend(@PathVariable("friendSeq")@ApiParam(value = "해당 친구데이터의 Friend 테이블의 pk", required = true) int friendSeq){
        try {
            friendService.removeFriend(friendSeq);
            return new ResponseEntity<Void>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<String>("잘못된 요청입니다.",HttpStatus.BAD_REQUEST);
        }
    }

    //친구 따라가기
    @ApiOperation(value = "친구따라가기",notes = "요청유저를 대상유저가 입장하고 있는 방에 입장시킨다", response = Map.class)
    @PostMapping("/follow")
    public void followFriend(@RequestBody @ApiParam(value = "친구의 닉네임", required = true) String friendNickname){
        int userSeq = SecurityUtil.getCurrentUserId();
        friendService.followFriend(friendNickname, userSeq);
    }

}
