package com.ssafy.mafia.Repository;

import com.ssafy.mafia.Entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class AdminRepo {

    private final EntityManager em;

    //유저 전체 조회
    public List<User> findAll() {
        return em.createQuery("select U from User U", User.class).getResultList();
    }

    // 레드유저 관리
    public void redControl(int userSeq) {
        User user = em.find(User.class, userSeq);
        boolean isRed = user.isRedUser();
        user.setRedUser(!isRed);
        if (!isRed) {
            user.setBeRedUserAt(Timestamp.from(Instant.now()));
        }
        em.merge(user);
    }
}
