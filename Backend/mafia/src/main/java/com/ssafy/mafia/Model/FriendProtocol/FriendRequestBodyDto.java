package com.ssafy.mafia.Model.FriendProtocol;


import lombok.Data;

@Data
public class FriendRequestBodyDto {
    private FriendHeaderDto header;
    private FriendRequestDataDto data;

}
