package com.ssafy.mafia.Config;

import com.ssafy.mafia.auth.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Slf4j
public class MessageHandler implements ChannelInterceptor {

    @Autowired
    private TokenProvider tokenProvider;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        String command = accessor.getMessageHeaders().get("simpMessageType").toString();

        log.info("[메시지 인터셉터] Command : {}", command);

        if(command != null && command.equals("MESSAGE")){
            String token = accessor.getNativeHeader("token").get(0);
            if(token == null){
                log.info("[메시지 인터셉터] Token Null : 액세스 토큰이 필요합니다.");
                return message;
            }

            log.info("[메시지 인터셉터] token - {}", token);
            Authentication authentication = tokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        return message;
    }
}
