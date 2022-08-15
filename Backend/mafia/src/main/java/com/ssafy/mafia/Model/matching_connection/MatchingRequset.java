package com.ssafy.mafia.Model.matching_connection;

import lombok.Data;

@Data
public class MatchingRequset {
    private MatchingHeader header;
    private MatchingRequestData data;
}
