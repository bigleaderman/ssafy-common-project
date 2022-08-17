package com.ssafy.mafia.Model.FriendProtocol;

import lombok.Data;

@Data
public class FriendResponseBodyDto {
    private FriendHeaderDto header;
    private FriendResponseDataDto friendResponseDataDto;

}
