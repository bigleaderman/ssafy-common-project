package com.ssafy.mafia.Repository;

import com.ssafy.mafia.Entity.Report;
import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.ReportedListResponseDto;
import com.ssafy.mafia.Model.ReportingListResponseDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private static final Logger log = LoggerFactory.getLogger(AdminRepo.class);

    //유저 전체 조회
    public List<User> findAll() {
        List<User> result = em.createQuery("select U from User U", User.class).getResultList();
        if (result.isEmpty()){
            log.info("유저가 없습니다");
        }else {log.info("유저목록을 반환합니다");}

        return result;
    }

    //유저 세부조회
    public User findUser(int userSeq) throws Exception{
        User user = em.find(User.class, userSeq);
        return user;
    }


    // 레드유저 관리
    public void redControl(int userSeq) throws Exception {
        User user = em.find(User.class, userSeq);
        boolean isRed = user.isRedUser();
        user.setRedUser(!isRed);
        if (!isRed) {
            user.setBeRedUserAt(Timestamp.from(Instant.now()));
        }
        em.merge(user);

    }

    // 유저가 신고한 신고 리스트
    public List<ReportingListResponseDto> reportingList(int userSeq) throws Exception{
        User user = em.find(User.class, userSeq);
        log.info("해당 유저를 찾았습니다");
        List<Report> reportList = em.createQuery("select R from Report R where R.reporting = :user")
                .setParameter("user",user)
                .getResultList();
        log.info("해당 유저가 신고한 리스트를 가져왔습니다.");
        List<ReportingListResponseDto> result = new ArrayList<>();
        for (Report report : reportList) {
            ReportingListResponseDto reportDto = new ReportingListResponseDto();
            reportDto.setReportedUser(report.getReported().getEmail());
            reportDto.setReportingAt(report.getReportAt());
            reportDto.setReportType(report.getReportType().toString());
            result.add(reportDto);
        }
        log.info("신고 리스트를 반환합니다.");
        return result;

    }
    // 유저가 신고당한 신고 리스트
    public List<ReportedListResponseDto> reportedList(int userSeq) throws Exception {

        User user = em.find(User.class, userSeq);
        log.info("해당 유저를 찾았습니다");
        List<Report> reportList = em.createQuery("select R from Report R where R.reported = :user")
                .setParameter("user",user)
                .getResultList();
        log.info("해당 유저를 신고한 리스트를 가져왔습니다.");
        List<ReportedListResponseDto> result = new ArrayList<>();
        for (Report report : reportList) {
            ReportedListResponseDto reportDto = new ReportedListResponseDto();
            reportDto.setReportingUser(report.getReporting().getEmail());
            reportDto.setReportingAt(report.getReportAt());
            reportDto.setReportType(report.getReportType().toString());
            result.add(reportDto);
        }
        log.info("신고 리스트를 반환합니다.");
        return result;

    }
}
