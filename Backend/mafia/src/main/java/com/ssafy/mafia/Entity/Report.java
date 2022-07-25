package com.ssafy.mafia.Entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
public class Report {

    @Id
    @GeneratedValue
    private int reportSeq;

    @Enumerated(EnumType.STRING)
    private ReportType reportType;

    private Timestamp reportAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "userSeq", name = "reporting", nullable = false)
    private User reporting;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "userSeq", name = "reported", nullable = false)
    private User reported;
}
