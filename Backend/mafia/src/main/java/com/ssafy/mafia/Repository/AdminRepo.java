package com.ssafy.mafia.Repository;

import com.ssafy.mafia.Entity.Report;
import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.ReportedListResponseDto;
import com.ssafy.mafia.Model.ReportingListResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class AdminRepo {

    private final EntityManager em;

    //유저 전체 조회
    public List<User> findAll() {
        return em.createQuery("select U from User U", User.class).getResultList();
    }

    //유저 세부조회
    public User findUser(int userSeq){
        return em.find(User.class, userSeq);
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

    // 유저가 신고한 신고 리스트
    public List<ReportingListResponseDto> reportingList(int userSeq) {

        User user = em.find(User.class, userSeq);

        List<Report> reportList = em.createQuery("select R from Report R where R.reporting = :user")
                .setParameter("user",user)
                .getResultList();
        List<ReportingListResponseDto> result = new ArrayList<>();
        for (Report report : reportList) {
            ReportingListResponseDto reportDto = new ReportingListResponseDto();
            reportDto.setReportedUser(report.getReported().getEmail());
            reportDto.setReportingAt(report.getReportAt());
            reportDto.setReportType(report.getReportType().toString());
            result.add(reportDto);
        }
        return result;
    }
    // 유저가 신고당한 신고 리스트
    public List<ReportedListResponseDto> reportedList(int userSeq) {

        User user = em.find(User.class, userSeq);

        List<Report> reportList = em.createQuery("select R from Report R where R.reported = :user")
                .setParameter("user",user)
                .getResultList();
        List<ReportedListResponseDto> result = new ArrayList<>();
        for (Report report : reportList) {
            ReportedListResponseDto reportDto = new ReportedListResponseDto();
            reportDto.setReportingUser(report.getReporting().getEmail());
            reportDto.setReportingAt(report.getReportAt());
            reportDto.setReportType(report.getReportType().toString());
            result.add(reportDto);
        }
        return result;
    }
}
