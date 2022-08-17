package com.ssafy.mafia.Service;

import com.ssafy.mafia.Model.ReportDto;
import com.ssafy.mafia.Repository.ReportRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepo reportRepo;

    public void report(ReportDto reportDto) throws Exception{
        reportRepo.createReport(reportDto);
    }

}
