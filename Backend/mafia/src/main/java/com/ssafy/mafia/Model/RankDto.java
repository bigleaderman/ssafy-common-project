package com.ssafy.mafia.Model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor

public class RankDto {
    private String nickname;
    private int winCount;
    private int loseCount;
    private int rankPoint;
}
