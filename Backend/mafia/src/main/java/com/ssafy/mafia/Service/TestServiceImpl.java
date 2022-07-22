package com.ssafy.mafia.Service;

import com.ssafy.mafia.Model.UserDto;
import com.ssafy.mafia.Repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class TestServiceImpl implements TestService{

    @Autowired
    private MemberRepository repo;

    @Override
    public List<UserDto> getAllUser() {

        return null;
    }
}
