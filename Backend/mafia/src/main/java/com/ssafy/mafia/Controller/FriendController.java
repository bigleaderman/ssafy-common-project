package com.ssafy.mafia.Controller;

import com.ssafy.mafia.Model.FriendDto;
import com.ssafy.mafia.Model.FriendProtocol.FriendHeaderDto;
import com.ssafy.mafia.Model.FriendProtocol.FriendRequestBodyDto;
import com.ssafy.mafia.Model.FriendProtocol.FriendResponseBodyDto;
import com.ssafy.mafia.Model.FriendProtocol.FriendResponseDataDto;
import com.ssafy.mafia.Model.FriendResponseDto;
import com.ssafy.mafia.Service.FriendService;
import com.ssafy.mafia.auth.service.UserService;
import com.ssafy.mafia.auth.util.SecurityUtil;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Api(value = "FriendController V1", tags = {"친구관련기능"})
@RestController
@RequestMapping
@RequiredArgsConstructor
public class FriendController {

    private final FriendService friendService;
    private final UserService userService;
    private final SimpMessagingTemplate template;
    private static final Logger log = LoggerFactory.getLogger(FriendController.class);

    //친구 신청
    @ApiOperation(value = "친구신청", notes = "Friend 테이블에 새로운 친구관계 데이터를 생성한다")
    @PostMapping("/api/user/friend/request")
    public ResponseEntity<?> friendRequest(@RequestBody @ApiParam(value = "대상유저 id", required = true) int friendSeq) {
        int userSeq = SecurityUtil.getCurrentUserId();
        FriendDto friendDto = new FriendDto();
        friendDto.setFromUser(userSeq);
        friendDto.setToUser(friendSeq);

        try {
            if (friendService.friendRequest(friendDto)) {
                return new ResponseEntity<Void>(HttpStatus.OK);
            }
        } catch (Exception e) {
            log.error("잘못된 요청입니다 : " + e);
            e.printStackTrace();
            return new ResponseEntity<String>("잘못된 요청입니다.", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<String>("이미 친구신청을 하였습니다.", HttpStatus.BAD_REQUEST);
    }

    //친구 신청 목록 조회
    @ApiOperation(value = "친구신청 목록조회", notes = "요청 회원을 대상으로한 친구신청의 목록을 반환한다")
    @GetMapping("/api/user/friend/request-list")
    public ResponseEntity<List<FriendResponseDto>> checkRequest() {
        int userSeq = SecurityUtil.getCurrentUserId();
        try {
            return new ResponseEntity<List<FriendResponseDto>>(friendService.findFriendRequest(userSeq), HttpStatus.OK);
        } catch (Exception e) {
            log.error("잘못된 요청입니다 : " + e);
            return null;
        }
    }

    //친구 목록 조회
    @ApiOperation(value = "친구목록 조회", notes = "친구신청을 수락한 유저들의 목록을 반환한다", response = Map.class)
    @GetMapping("/api/user/friend/friend-list")
    public ResponseEntity<List<FriendResponseDto>> findFriend() {
        int userSeq = SecurityUtil.getCurrentUserId();
        try {
            return new ResponseEntity<List<FriendResponseDto>>(friendService.findFriend(userSeq), HttpStatus.OK);
        } catch (Exception e) {
            log.error("잘못된 요청입니다 : " + e);
            return null;
        }
    }

    // 친구신청 수락
    @ApiOperation(value = "친구신청 수락", notes = "Frined 테이블에 해당 데이터에서 is_accept컬럼을 true변환 후 양방향 데이터를 생성한다")
    @PutMapping("/api/user/friendaccept/{friendSeq}")
    public ResponseEntity<?> acceptFriend(@PathVariable("friendSeq") @ApiParam(value = "해당 친구신청데이터의 Friend 테이블의 pk", required = true) int friendSeq) {
        try {
            if (friendService.beFriend(friendSeq)) {
                return new ResponseEntity<Void>(HttpStatus.OK);
            } else {
                return new ResponseEntity<String>("이미 친구입니다.", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            log.error("잘못된 요청입니다 : " + e);
            e.printStackTrace();
            return new ResponseEntity<String>("잘못된 요청입니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //친구신청 거절
    @ApiOperation(value = "친구신청 거절", notes = "Friend 테이블에서 해당 데이터를 삭제한다")
    @DeleteMapping("/api/user/friendaccept/refuse/{friendSeq}")
    public ResponseEntity<?> refuseFriend(@PathVariable("friendSeq") @ApiParam(value = "해당 친구신청데이터의 Friend 테이블의 pk", required = true) int friendSeq) {
        try {
            friendService.refuseFriend(friendSeq);
            return new ResponseEntity<String>("친구신청을 거절하였습니다", HttpStatus.OK);
        } catch (Exception e) {
            log.error("잘못된 요청입니다 : " + e);
            e.printStackTrace();
            return new ResponseEntity<String>("잘못된 요청입니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //친구삭제
    @ApiOperation(value = "친구삭제", notes = "Friend 테이블에서 해당 데이터 및 해당 데이터와 양방향 관계의 데이터를 삭제한다")
    @DeleteMapping("/api/user/friendremove/{friendSeq}")
    public ResponseEntity<?> removeFriend(@PathVariable("friendSeq") @ApiParam(value = "해당 친구데이터의 Friend 테이블의 pk", required = true) int friendSeq) {
        try {
            friendService.removeFriend(friendSeq);
            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (Exception e) {
            log.error("잘못된 요청입니다 : " + e);
            return new ResponseEntity<String>("잘못된 요청입니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //친구 따라가기
    @ApiOperation(value = "친구따라가기", notes = "요청유저를 대상유저가 입장하고 있는 방에 입장시킨다", response = Map.class)
    @PostMapping("/api/user/friend/follow")
    public void followFriend(@RequestBody @ApiParam(value = "친구의 닉네임", required = true) String friendNickname) {
        int userSeq = SecurityUtil.getCurrentUserId();
        friendService.followFriend(friendNickname, userSeq);
    }


    // 웹소켓
    // url의 닉네임은 대상의 닉네임
    @MessageMapping("/friend/{nickname}")
    public void friendFunction(@DestinationVariable("nickname") String nickname, @Payload FriendRequestBodyDto message) throws Exception {
        // 친구 신청 요청이면
        if (message.getHeader().getType().equals("offer")) {
            int from = userService.userInformation(message.getData().getFrom()).getUserSeq();
            int to = userService.userInformation(message.getData().getTo()).getUserSeq();
            FriendDto friendDto = new FriendDto();
            friendDto.setFromUser(from);
            friendDto.setToUser(to);
            //친구신청하기
            friendService.friendRequest(friendDto);
            // 친구신청목록 가져오기
            List<FriendResponseDto> result = friendService.findFriendRequest(to);
            FriendResponseBodyDto responseBodyDto = new FriendResponseBodyDto();
            responseBodyDto.setHeader(new FriendHeaderDto());
            responseBodyDto.setFriendResponseDataDto(new FriendResponseDataDto());
            responseBodyDto.getFriendResponseDataDto().setUsers(result);
            responseBodyDto.getHeader().setType("offer-list");
            template.convertAndSend("/sub/friend/" + message.getData().getTo(), responseBodyDto);
        }
        //친구 신청 수락이면
        else if (message.getHeader().getType().equals("offer-accept")) {
            // 친구신청 수락 로직 실행
            friendService.beFriend(message.getData().getFriendSeq());
            int from = userService.userInformation(message.getData().getFrom()).getUserSeq();
            int to = userService.userInformation(message.getData().getTo()).getUserSeq();
            // 친구의 친구목록 가져오기
            List<FriendResponseDto> friendResult = friendService.findFriend(to);
            System.out.println("친구의 친구목록: " + friendResult.toString());
            // 나의 친구목록 가져오기
            List<FriendResponseDto> meResult = friendService.findFriend(from);
            System.out.println("나의 친구목록" + meResult.toString());

            // 친구에게 반환할 친구목록 만들기
            FriendResponseBodyDto toList = new FriendResponseBodyDto();
            toList.setFriendResponseDataDto(new FriendResponseDataDto());
            toList.getFriendResponseDataDto().setUsers(friendResult);
            toList.setHeader(new FriendHeaderDto());
            System.out.println("친구에게 반환할 친구목록 " + toList.getFriendResponseDataDto().getUsers().toString());
            toList.getHeader().setType("list");
            // 친구에게 반환
            template.convertAndSend("/sub/friend/" + message.getData().getTo(), toList);
            System.out.println("이게 찍힌다면 친구에게 친구목록을 전달한겁니다.");

            // 나에게 반환할 친구목록 만들기
            FriendResponseBodyDto fromList = new FriendResponseBodyDto();
            fromList.setHeader(new FriendHeaderDto());
            fromList.setFriendResponseDataDto(new FriendResponseDataDto());
            fromList.getFriendResponseDataDto().setUsers(meResult);
            fromList.getHeader().setType("list");
            //나에게 친구목록 반환
            template.convertAndSend("/sub/friend/" + message.getData().getFrom(), fromList);

            // 나에게 반환할 친구신청목록 가져오기
            FriendResponseBodyDto responseBodyDto = new FriendResponseBodyDto();
            responseBodyDto.setHeader(new FriendHeaderDto());
            responseBodyDto.setFriendResponseDataDto(new FriendResponseDataDto());
            responseBodyDto.getFriendResponseDataDto().setUsers(friendService.findFriendRequest(from));
            responseBodyDto.getHeader().setType("offer-list");
            // 나에게 친구신청목록반환
            template.convertAndSend("/sub/friend/" + message.getData().getFrom(), responseBodyDto);
        }
        //친구 신청 거절이면
        else if (message.getHeader().getType().equals("offer-deny") ) {
            // 친구 신청 거절 로직 실행
            friendService.refuseFriend(message.getData().getFriendSeq());
            // 나에게 반환할 친구 신청 목록
            int from = userService.userInformation(message.getData().getFrom()).getUserSeq();
            FriendResponseBodyDto responseBodyDto = new FriendResponseBodyDto();
            responseBodyDto.setHeader(new FriendHeaderDto());
            responseBodyDto.setFriendResponseDataDto(new FriendResponseDataDto());
            responseBodyDto.getFriendResponseDataDto().setUsers(friendService.findFriendRequest(from));
            responseBodyDto.getHeader().setType("offer-list");
            // 나에게 친구신청목록반환
            template.convertAndSend("/sub/friend/" + message.getData().getFrom(), responseBodyDto);
        }
        //친구 삭제면
        else if(message.getHeader().getType().equals("delete")) {
            // 친구 삭제 로직 실행
            friendService.removeFriend(message.getData().getFriendSeq());

            int from = userService.userInformation(message.getData().getFrom()).getUserSeq();
            int to = userService.userInformation(message.getData().getTo()).getUserSeq();

            // 친구의 친구목록 가져오기
            List<FriendResponseDto> friendResult = friendService.findFriend(to);
            // 나의 친구목록 가져오기
            List<FriendResponseDto> meResult = friendService.findFriend(from);

            // 친구에게 반환할 친구목록 만들기
            FriendResponseBodyDto toList = new FriendResponseBodyDto();
            toList.setHeader(new FriendHeaderDto());
            toList.setFriendResponseDataDto(new FriendResponseDataDto());
            toList.getFriendResponseDataDto().setUsers(friendResult);
            toList.getHeader().setType("list");
            // 친구에게 반환
            template.convertAndSend("/sub/friend/" + message.getData().getTo(), toList);

            // 나에게 반환할 친구목록 만들기
            FriendResponseBodyDto fromList = new FriendResponseBodyDto();
            fromList.setHeader(new FriendHeaderDto());
            fromList.setFriendResponseDataDto(new FriendResponseDataDto());
            fromList.getFriendResponseDataDto().setUsers(meResult);
            fromList.getHeader().setType("list");
            //나에게 친구목록 반환
            template.convertAndSend("/sub/friend/" + message.getData().getFrom(), fromList);
        }
    }
}
