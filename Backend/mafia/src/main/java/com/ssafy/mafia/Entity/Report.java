package com.ssafy.mafia.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reportSeq;

    @Enumerated(EnumType.STRING)
    private ReportType reportType;

    private Timestamp reportAt;

    @ManyToOne
    @JsonBackReference
    @PrimaryKeyJoinColumn(referencedColumnName = "userSeq", name = "reporting")
    private User reporting;

    @ManyToOne
    @JsonBackReference
    @PrimaryKeyJoinColumn(referencedColumnName = "userSeq", name = "reported")
    private User reported;
}
