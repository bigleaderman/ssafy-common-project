package com.ssafy.mafia.Game;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.List;
import java.util.Set;

public class GameManager {

    @Autowired
    private SimpMessagingTemplate template;

    private int roomSeq;
    private List<Player> players;

    public void start() {

    }


}
