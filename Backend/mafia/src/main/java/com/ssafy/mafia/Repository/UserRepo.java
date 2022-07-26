package com.ssafy.mafia.Repository;

import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.UserDto;
import org.hibernate.boot.model.naming.IllegalIdentifierException;
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

//    // 로그인
//    public void login(UserDto userDto) {
//        User user = em.find(User.class, userDto.getEmail());
//        if (userDto.getPassword() == user.getPassword()) {
//            user.setLogin(!user.isLogin());
//            //토큰발급
//        }
        
//    }
}
