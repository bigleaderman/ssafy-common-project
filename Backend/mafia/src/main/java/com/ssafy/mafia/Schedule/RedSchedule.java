package com.ssafy.mafia.Schedule;

import com.ssafy.mafia.Repository.ReportRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.Instant;

@Component
@Transactional
@RequiredArgsConstructor
public class RedSchedule {
    private final ReportRepo reportRepo;
    @Scheduled(cron = "0 0 0 * * *")
    public void test(){
        reportRepo.checkRedPeriod();
    }
}
