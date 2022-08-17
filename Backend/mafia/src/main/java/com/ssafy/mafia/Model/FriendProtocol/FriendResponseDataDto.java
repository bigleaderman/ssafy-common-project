package com.ssafy.mafia.Model.FriendProtocol;

import com.ssafy.mafia.Model.FriendResponseDto;
import lombok.Data;

import java.util.List;

@Data
public class FriendResponseDataDto {
    private List<FriendResponseDto> users;
}
