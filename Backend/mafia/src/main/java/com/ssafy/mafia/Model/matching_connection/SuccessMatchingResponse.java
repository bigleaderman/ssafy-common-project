package com.ssafy.mafia.Model.matching_connection;

import lombok.Data;

@Data
public class SuccessMatchingResponse {
    private MatchingHeader header;
    private SuccessMatchingResponseData data;
}
