package com.ssafy.mafia.auth.controller.dto;

import com.ssafy.mafia.Entity.Authority;
import com.ssafy.mafia.Entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class signupDto {
    private int userSeq;

    private String email;

    public static signupDto convert(User user){
        return new signupDto(user.getUserSeq(), user.getEmail());
    }
}
