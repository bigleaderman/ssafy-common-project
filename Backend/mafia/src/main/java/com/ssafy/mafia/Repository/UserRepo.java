package com.ssafy.mafia.Repository;

import com.ssafy.mafia.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
public class UserRepo {

    @Autowired
    private EntityManager em;

    public void save(User user){
        em.persist(user);
    }
}
