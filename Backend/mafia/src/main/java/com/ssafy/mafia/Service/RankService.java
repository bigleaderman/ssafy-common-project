package com.ssafy.mafia.Service;

import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.RankDto;
import com.ssafy.mafia.auth.repository.UserRepository;
import com.ssafy.mafia.auth.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RankService {

    private final UserRepository userRepository;
    private final EntityManager em;

    public List searchTopRank() {
         Query query = em.createQuery("SELECT u.nickname, u.winCount, u.loseCount, u.rankPoint FROM User u ORDER BY u.rankPoint DESC").setMaxResults(10);
         List resultList = query.getResultList();
        return resultList;
    }

    public void changeRank(boolean result) {
        User user = em.find(User.class, SecurityUtil.getCurrentUserId());
        if (result) {
            user.setWinCount(user.getWinCount() + 1);
            user.setRankPoint(user.getRankPoint() + 20);
        }
        else {
            user.setLoseCount(user.getLoseCount() + 1);
            user.setRankPoint(user.getRankPoint() - 10);
        }
    }
}
