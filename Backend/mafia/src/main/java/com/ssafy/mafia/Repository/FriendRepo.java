package com.ssafy.mafia.Repository;

import com.ssafy.mafia.Entity.Friend;
import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.FriendDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class FriendRepo {
    private final EntityManager em;

    //최초 친구신청
    public void createFriend(FriendDto friendDto) {
        Friend friend = new Friend();
        User from = em.find(User.class, friendDto.getFromUser());
        User to = em.find(User.class, friendDto.getToUser());
        friend.setFriendFrom(from);
        friend.setFriendTo(to);
        friend.setAccept(false);
        friend.setApplyAt(Timestamp.from(Instant.now()));
        em.persist(friend);
    }

    // 친구 신청목록 조회
    public List<User> getFriendRequest(int userSeq) {
        User user = em.find(User.class, userSeq);
        List<Friend> friendList = user.getFriendTo();
        List<User> result = new ArrayList<>();
        for(Friend friend: friendList) {
            if (!friend.isAccept()){
                User findUser = em.find(User.class,friend.getFriendTo().getUserSeq());
                result.add(findUser);
            }
        }
        return result;
    }
}
