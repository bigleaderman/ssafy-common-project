package com.ssafy.mafia.Repository;


import com.ssafy.mafia.Entity.Report;
import com.ssafy.mafia.Entity.ReportType;
import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.ReportDto;
import com.ssafy.mafia.Service.SessionService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import javax.persistence.EntityManager;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ReportRepo {

    private final EntityManager em;
    private static final Logger log = LoggerFactory.getLogger(ReportRepo.class);

    //신고하기 기능
    public void createReport(ReportDto reportDto) throws Exception {
        Report report = new Report();
        log.info("대상유저를 찾았습니다.");
        ReportType reportType = null;
        User reportingUser = em.find(User.class,reportDto.getReportingUserSeq());
        User reportedUser = em.find(User.class,reportDto.getReportedUserSeq());
        reportedUser.setReportedCount(reportedUser.getReportedCount()+1);
        em.merge(reportedUser);
        log.info("신고정보를 유저에게 저장했습니다.");
        //만약 신고횟수가 10단위 이면 레드유저가 되야함
        if (reportedUser.getReportedCount() % 10 == 0 && reportedUser.getReportedCount() != 0){
            reportedUser.setRedUser(true);
            reportedUser.setBeRedUserAt(Timestamp.from(Instant.now()));
            log.info("10단위의 신고로 인해 레드유저가 되었습니다.");
            em.merge(reportedUser);
            log.info("신고정보를 유저에게 저장했습니다.");
        }

        //아래 report 테이블에 정보생성 로직

        report.setReporting(reportingUser);
        report.setReported(reportedUser);
        report.setReportAt(Timestamp.from(Instant.now()));
        report.setReportType(reportType.valueOf(reportDto.getReportType()));
        em.persist(report);
        log.info("신고정보를 저장하였습니다.");
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



