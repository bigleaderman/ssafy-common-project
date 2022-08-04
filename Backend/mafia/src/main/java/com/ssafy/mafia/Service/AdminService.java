package com.ssafy.mafia.Service;

import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.ReportedListResponseDto;
import com.ssafy.mafia.Model.ReportingListResponseDto;
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

    public User getUser(int userSeq) throws Exception{
        return adminRepo.findUser(userSeq);
    }

    //레드 관리
    @Transactional
    public void redControl(int userSeq) throws Exception{
        adminRepo.redControl(userSeq);
    }

    // 유저가 신고한 신고 리스트
    public List<ReportingListResponseDto> reportingList(int userSeq) throws Exception{
        return adminRepo.reportingList(userSeq);
    }

    // 유저가 신고당한 신고 리스트
    public List<ReportedListResponseDto> reportedList(int userSeq) throws Exception{
        return adminRepo.reportedList(userSeq);
    }
}
