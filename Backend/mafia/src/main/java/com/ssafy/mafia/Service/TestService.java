package com.ssafy.mafia.Service;

import com.ssafy.mafia.Model.UserDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TestService {
    List<UserDto> getAllUser();
}
