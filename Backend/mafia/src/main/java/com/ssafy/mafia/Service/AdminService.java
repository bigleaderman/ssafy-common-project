package com.ssafy.mafia.Service;

import com.ssafy.mafia.Repository.Entity.User;
import com.ssafy.mafia.Repository.AdminRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminService {

    private final AdminRepo adminRepo;

    public List<User> getAllUser(){
        return adminRepo.findAll();
    }

    //레드 관리
    @Transactional
    public void redControl(int userSeq) {
        adminRepo.redControl(userSeq);
    }
}
