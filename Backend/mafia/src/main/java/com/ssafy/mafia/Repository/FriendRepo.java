package com.ssafy.mafia.Repository;

import com.ssafy.mafia.Entity.Friend;
import com.ssafy.mafia.Entity.RoomInfo;
import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.FriendDto;
import com.ssafy.mafia.Model.FriendResponseDto;
import com.ssafy.mafia.Model.UserDto;
import com.ssafy.mafia.Service.RoomService;
import lombok.RequiredArgsConstructor;
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

    //최초 친구신청
    //이미 친구신청을 했었니?그럼 안돼 로직을 작성
    public boolean createFriend(FriendDto friendDto) {
        if (isFriendCheck(friendDto)) {
            Friend friend = new Friend();
            User from = em.find(User.class, friendDto.getFromUser());
            User to = em.find(User.class, friendDto.getToUser());
            friend.setFriendFrom(from);
            friend.setFriendTo(to);
            friend.setAccept(false);
            friend.setApplyAt(Timestamp.from(Instant.now()));
            em.persist(friend);
            return true;
        }
        return false;
    }

    //친구목록에 지금 신청한애가 있는가?
    public boolean isFriendCheck(FriendDto friendDto) {
        //친구신청을 시도하려는 유저
        User fromUser = em.find(User.class,friendDto.getFromUser());
        // 친구신청을 걸려는 대상 유저
        User toUser = em.find(User.class,friendDto.getToUser());
        // 나의 friendFrom 리스트
        List<Friend> friendFromList = fromUser.getFriendFrom();
        // 나의 friendTo 리스트
        List<Friend> friendToList = fromUser.getFriendTo();
        // friendFrom 리스트 체크
        // 목록에 있으면 실패 리턴
        for (Friend check : friendFromList ){
            if (check.getFriendTo().getUserSeq() == toUser.getUserSeq()){
                return false;
            }
        }
        // friendTo 리스트 체크
        // 목록에 있으면 실패 리턴
        for (Friend check : friendToList) {
            if (check.getFriendFrom().getUserSeq() == toUser.getUserSeq()){
                System.out.println("===check======");
                return false;
            }
        }
        return true;
    }



    // 친구 신청목록 조회
    public List<FriendResponseDto> getFriendRequest(int userSeq) {
        User user = em.find(User.class, userSeq);
        List<Friend> friendList = user.getFriendTo();
        List<FriendResponseDto> result = new ArrayList<>();
        for(Friend friend: friendList) {
            FriendResponseDto response = new FriendResponseDto();
            if (!friend.isAccept()){
                response.setNickname(friend.getFriendFrom().getNickname());
                response.setAccept(friend.isAccept());
                response.setFriendSeq(friend.getFriendSeq());
                result.add(response);
//                User findUser = em.find(User.class, friend.getFriendFrom().getUserSeq());
//                result.add(findUser);
            }
        }
        return result;
    }

    //친구목록 조회
    public List<FriendResponseDto> getFriendList(int userSeq) {
        List<FriendResponseDto> result = new ArrayList<>();
        User user = em.find(User.class, userSeq);
        List<Friend> friendList = em.createQuery("select F from Friend F", Friend.class).getResultList();
        for (Friend friend :friendList) {
            FriendResponseDto response = new FriendResponseDto();
            if (friend.getFriendFrom() == user && friend.isAccept()){
                response.setFriendSeq(friend.getFriendSeq());
                response.setNickname(friend.getFriendTo().getNickname());
                response.setAccept(friend.isAccept());
                result.add(response);
            }
//            else if(friend.getFriendFrom() == user && friend.isAccept()){
//                response.setFriendSeq(friend.getFriendSeq());
//                response.setNickname(friend.getFriendTo().getNickname());
//                response.setAccept(friend.isAccept());
//                result.add(response);
//            }
        }
        return result;
    }

    //친구수락
    public boolean changeAccept(int friendSeq){
        Friend friend = em.find(Friend.class, friendSeq);
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
        }else {return false;}
    }

    //친구 신청 거절
    public void removeAccept(int friendSeq) {
        Friend friend = em.find(Friend.class, friendSeq);
        if (!friend.isAccept()){
        em.remove(friend);
        }
    }

    //친구 삭제
    public void deleteFriend(int friendSeq) {
        Friend friend = em.find(Friend.class, friendSeq);
        //from이 나 to가 친구임
        // to가 나고 from이 친구인 raw찾아야함
        List<Friend> friendList = em.createQuery("select F from Friend F", Friend.class).getResultList();
        for (Friend f: friendList){
            if(f.getFriendTo()==friend.getFriendFrom() && f.getFriendFrom()==friend.getFriendTo()){
                em.remove(f);
            }
        }
        em.remove(friend);
    }

    //친구 따라가기
    public void followFriend(String friendNickname, int userSeq){
        // 따라갈 친구
        TypedQuery<User> query = em.createQuery(
                "SELECT u FROM User u WHERE u.nickname = '" + friendNickname + "'", User.class);
        User friend = query.getSingleResult();

        // 나
        User me = em.find(User.class, userSeq);

        // 친구가 지금 있는 방
        RoomInfo room = em.find(RoomInfo.class, friend.getNowRoomSeq());

        // 방에 입장하기
        roomService.joinRoom(room.getRoomSeq(), userSeq);
    }
}
