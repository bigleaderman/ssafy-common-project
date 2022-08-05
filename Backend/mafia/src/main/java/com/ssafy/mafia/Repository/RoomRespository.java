package com.ssafy.mafia.Repository;

import com.ssafy.mafia.Entity.RoomInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRespository extends JpaRepository<RoomInfo, Integer> {
}
