package com.ssafy.mafia.Controller;

import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Model.RankDto;
import com.ssafy.mafia.Service.RankService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class RankController {

    private final RankService rankService;

    @GetMapping("/game/topRank")
    public List searchTopRank () {
        return rankService.searchTopRank();
    }

    @PutMapping("/user/game/rank")
    public void changeRank(@RequestBody boolean result) {
        rankService.changeRank(result);
    }
}
