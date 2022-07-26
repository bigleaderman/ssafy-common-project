package com.ssafy.mafia.Service;

import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.FriendDto;
import com.ssafy.mafia.Repository.FriendRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FriendService {

    private final FriendRepo friendRepo;
    //친구신청
    @Transactional
    public void friendRequest(FriendDto friendDto){
        friendRepo.createFriend(friendDto);
    }

    //친구신청 목록조회
    public List<User> findFriendRequest(int userSeq){
        return friendRepo.getFriendRequest(userSeq);
    }
}
