package com.ssafy.mafia.Repository;

import com.ssafy.mafia.Entity.GameInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRespository extends JpaRepository<GameInfo, Integer> {

}
