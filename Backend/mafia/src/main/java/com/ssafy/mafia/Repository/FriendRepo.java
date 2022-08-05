package com.ssafy.mafia.Repository;

import com.ssafy.mafia.Entity.Friend;
import com.ssafy.mafia.Entity.RoomInfo;
import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.FriendDto;
import com.ssafy.mafia.Model.FriendResponseDto;
import com.ssafy.mafia.Service.RoomService;
import com.ssafy.mafia.Service.SessionService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;


@Repository
@RequiredArgsConstructor
public class FriendRepo {
    private final EntityManager em;
    private final RoomService roomService;
    private static final Logger log = LoggerFactory.getLogger(FriendRepo.class);

    //최초 친구신청
    //이미 친구신청을 했었니?그럼 안돼 로직을 작성
    public boolean createFriend(FriendDto friendDto){
        if (isFriendCheck(friendDto)) {
            Friend friend = new Friend();
            User from = em.find(User.class, friendDto.getFromUser());
            User to = em.find(User.class, friendDto.getToUser());
            friend.setFriendFrom(from);
            friend.setFriendTo(to);
            friend.setAccept(false);
            friend.setApplyAt(Timestamp.from(Instant.now()));
            em.persist(friend);
            log.info("친구신청을 완료하였습니다.");
            return true;
        }
        return false;
    }

    //친구목록에 지금 신청한애가 있는가?
    public boolean isFriendCheck(FriendDto friendDto) {
        //친구신청을 시도하려는 유저
        User fromUser = em.find(User.class,friendDto.getFromUser());
        log.info("친구신청 시도 유저를 찾았습니다");
        // 친구신청을 걸려는 대상 유저
        User toUser = em.find(User.class,friendDto.getToUser());
        log.info("친구신청 대상 유저를 찾았습니다");
        // 나의 friendFrom 리스트
        List<Friend> friendFromList = fromUser.getFriendFrom();
        // 나의 friendTo 리스트
        List<Friend> friendToList = fromUser.getFriendTo();
        // friendFrom 리스트 체크
        // 목록에 있으면 실패 리턴
        for (Friend check : friendFromList ){
            if (check.getFriendTo().getUserSeq() == toUser.getUserSeq()){
                log.info("이미 친구이거나 친구신청을 하였습니다.");
                return false;
            }
        }
        // friendTo 리스트 체크
        // 목록에 있으면 실패 리턴
        for (Friend check : friendToList) {
            if (check.getFriendFrom().getUserSeq() == toUser.getUserSeq()){
                log.info("이미 친구이거나 친구신청을 하였습니다.");
                return false;
            }
        }
        log.info("친구신청이 가능합니다");
        return true;
    }



    // 친구 신청목록 조회
    public List<FriendResponseDto> getFriendRequest(int userSeq) throws Exception {

        User user = em.find(User.class, userSeq);
        log.info("유저를 찾았습니다.");
        List<Friend> friendList = user.getFriendTo();
        List<FriendResponseDto> result = new ArrayList<>();
        for(Friend friend: friendList) {
            FriendResponseDto response = new FriendResponseDto();
            if (!friend.isAccept()){
                response.setNickname(friend.getFriendFrom().getNickname());
                response.setAccept(friend.isAccept());
                response.setFriendSeq(friend.getFriendSeq());
                response.setRed(friend.getFriendFrom().isRedUser());
                response.setStatus(friend.getFriendFrom().getUserStatus().toString());
                result.add(response);
            }
        }
        log.info("친구신청 목록을 반환합니다.");
        return result;


    }

    //친구목록 조회
    public List<FriendResponseDto> getFriendList(int userSeq) throws Exception{
        List<FriendResponseDto> result = new ArrayList<>();
        User user = em.find(User.class, userSeq);
        log.info("유저를 찾았습니다.");
        List<Friend> friendList = em.createQuery("select F from Friend F", Friend.class).getResultList();
        for (Friend friend :friendList) {
            FriendResponseDto response = new FriendResponseDto();
            if (friend.getFriendFrom() == user && friend.isAccept()){
                response.setFriendSeq(friend.getFriendSeq());
                response.setNickname(friend.getFriendTo().getNickname());
                response.setAccept(friend.isAccept());
                response.setRed(friend.getFriendTo().isRedUser());
                result.add(response);
            }
        }
        log.info("친구목록을 반환합니다.");
        return result;


    }

    //친구수락
    public boolean changeAccept(int friendSeq) throws Exception{

        Friend friend = em.find(Friend.class, friendSeq);
        log.info("해당 친구신청을 찾았습니다.");
        Friend newFriend = new Friend();
        if (!friend.isAccept()) {
            friend.setAccept(true);
            em.merge(friend);
            newFriend.setFriendTo(friend.getFriendFrom());
            newFriend.setFriendFrom(friend.getFriendTo());
            newFriend.setAccept(true);
            newFriend.setApplyAt(Timestamp.from(Instant.now()));
            em.persist(newFriend);
            return true;
        }else {
            log.info("이미 친구입니다.");
            return false;}

    }

    //친구 신청 거절
    public void removeAccept(int friendSeq) throws Exception{
        Friend friend = em.find(Friend.class, friendSeq);
        log.info("해당 친구신청을 찾았습니다.");
        if (!friend.isAccept()){
            log.info("해당 신청을 삭제하였습니다.");
        em.remove(friend);
        }
    }

    //친구 삭제
    public void deleteFriend(int friendSeq) throws Exception {
        Friend friend = em.find(Friend.class, friendSeq);
        log.info("해당 친구관계를 찾았습니다.");
        //from이 나 to가 친구임
        // to가 나고 from이 친구인 raw찾아야함
        List<Friend> friendList = em.createQuery("select F from Friend F", Friend.class).getResultList();
        for (Friend f: friendList){
            if(f.getFriendTo()==friend.getFriendFrom() && f.getFriendFrom()==friend.getFriendTo()){
                log.info("해당 양방향 친구관계를 찾았습니다.");
                em.remove(f);
                log.info("해당 양방향 친구관계를 삭제하였습니다..");
            }
        }
        log.info("해당 친구관계를 삭제하였습니다.");
        em.remove(friend);
    }

    //친구 따라가기
    public void followFriend(String friendNickname, int userSeq){
        // 따라갈 친구
        TypedQuery<User> query = em.createQuery(
                "SELECT u FROM User u WHERE u.nickname = '" + friendNickname + "'", User.class);
        User friend = query.getSingleResult();
        log.info("친구를 찾았습니다.");

        // 나
        User me = em.find(User.class, userSeq);

        // 친구가 지금 있는 방
        RoomInfo room = em.find(RoomInfo.class, friend.getNowRoomSeq());


        // 방에 입장하기
        roomService.joinRoom(room.getRoomSeq(), userSeq);
    }
}
