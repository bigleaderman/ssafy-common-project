package com.ssafy.mafia.Model.matching_connection;

import lombok.Data;

@Data
public class MatchingResponse {
    private MatchingHeader header;
    private MatchingResponseData data;
}
