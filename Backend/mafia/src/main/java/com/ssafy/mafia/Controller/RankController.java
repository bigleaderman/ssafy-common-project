package com.ssafy.mafia.Controller;

import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.RankDto;
import com.ssafy.mafia.Service.RankService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class RankController {

    private final RankService rankService;

    @GetMapping("/game/topRank")
    @ApiOperation(value = "탑10랭크유저정보", notes = "랭크 유저정보 list로 반환하기", response = List.class)
    public List searchTopRank () {
        return rankService.searchTopRank();
    }

    @PutMapping("/user/game/rank")
    @ApiOperation(value = "랭크정보 수정하기", notes = "자신의 승, 패, 점수 변경", response = void.class)
    public void changeRank(@RequestBody boolean result) {
        rankService.changeRank(result);
    }
}
