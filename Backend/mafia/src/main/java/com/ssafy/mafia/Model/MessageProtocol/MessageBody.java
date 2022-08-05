package com.ssafy.mafia.Model.MessageProtocol;

import lombok.Data;

@Data
public class MessageBody {
    private HeaderDto header;
    private DataDto data;
}
