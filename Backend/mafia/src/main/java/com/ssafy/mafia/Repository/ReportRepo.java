package com.ssafy.mafia.Repository;


import com.ssafy.mafia.Entity.Report;
import com.ssafy.mafia.Entity.ReportType;
import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.ReportDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import javax.persistence.EntityManager;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ReportRepo {

    private final EntityManager em;

    //신고하기 기능
    public void createReport(ReportDto reportDto) {
        Report report = new Report();
        ReportType reportType = null;
        User reportingUser = em.find(User.class,reportDto.getReportingUserSeq());
        User reportedUser = em.find(User.class,reportDto.getReportedUserSeq());
        reportedUser.setReportedCount(reportedUser.getReportedCount()+1);
        em.merge(reportedUser);
        //만약 신고횟수가 10단위 이면 레드유저가 되야함
        if (reportedUser.getReportedCount()%10 == 0){
            reportedUser.setRedUser(true);
            reportedUser.setBeRedUserAt(Timestamp.from(Instant.now()));
            em.merge(reportedUser);
        }

        //아래 report 테이블에 정보생성 로직

        report.setReporting(reportingUser);
        report.setReported(reportedUser);
        report.setReportAt(Timestamp.from(Instant.now()));
        report.setReportType(reportType.valueOf(reportDto.getReportType()));
        em.persist(report);
    }

    //레드유저 기간체크
    public void checkRedPeriod(){
        List<User> userList = em.createQuery("select U from User U where U.isRedUser = true", User.class).getResultList();
        if (!userList.isEmpty()){
            for (User user : userList){
                // 신고당한지 5일이 지났다면 레드유저해제
                    // 뺀값이 5이상이면 바로처리
                if (Timestamp.from(Instant.now()).getDate() - user.getBeRedUserAt().getDate() >= 5){
                    user.setRedUser(false);
                    em.merge(user);}
                    //5미만인데 0미만이면
                else if (Timestamp.from(Instant.now()).getDate() - user.getBeRedUserAt().getDate() < 0 &&
                        Timestamp.from(Instant.now()).getDate() + 31 - user.getBeRedUserAt().getDate() >= 5){
                    user.setRedUser(false);
                    em.merge(user);
                }
            }
        }
    }
}



