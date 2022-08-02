package com.ssafy.mafia.Service;

import com.ssafy.mafia.Model.FriendDto;
import com.ssafy.mafia.Model.FriendResponseDto;
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
    public boolean friendRequest(FriendDto friendDto){
        if (friendRepo.createFriend(friendDto)){
            return true;
        }
        return false;
    }

    //친구신청 목록조회
    public List<FriendResponseDto> findFriendRequest(int userSeq){
        return friendRepo.getFriendRequest(userSeq);
    }

    //친구 목록조회
    public List<FriendResponseDto> findFriend(int userseq) {
        return friendRepo.getFriendList(userseq);
    }

    //친구 수락
    @Transactional
    public boolean beFriend(int friendSeq){
        return friendRepo.changeAccept(friendSeq);
    }

    //친구신청 거절
    @Transactional
    public void refuseFriend(int friendSeq){
        friendRepo.removeAccept(friendSeq);
    }

    @Transactional
    public void removeFriend(int friendSeq) {
        friendRepo.deleteFriend(friendSeq);
    }

    //친구 따라가기
    @Transactional
    public void followFriend(String friendNickname, int userSeq){
        friendRepo.followFriend(friendNickname, userSeq);
    }
}
