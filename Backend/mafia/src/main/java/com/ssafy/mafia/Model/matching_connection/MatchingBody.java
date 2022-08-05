package com.ssafy.mafia.Model.matching_connection;

import lombok.Data;

@Data
public class MatchingBody {
    private int userSeq;
    private int queueSeq;
    private boolean roomEnter;
    private int isRedUser;

}
