package com.ssafy.mafia.Service;


import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.UserDto;
import com.ssafy.mafia.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Transactional
    public void join(User user){
        userRepo.save(user);
    }

//    @Transactional
//    public void login(UserDto userDto) {
//        userRepo.login(userDto);
//    }
}
