package com.ssafy.mafia.Repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class FriendRepo {
    private final EntityManager em;

//    public void createFriend()
}
