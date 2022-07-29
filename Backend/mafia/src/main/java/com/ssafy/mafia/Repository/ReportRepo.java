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
        report.setReporting(reportingUser);
        report.setReported(reportedUser);
        report.setReportAt(Timestamp.from(Instant.now()));
        report.setReportType(reportType.valueOf(reportDto.getReportType()));
        em.persist(report);
    }
}
