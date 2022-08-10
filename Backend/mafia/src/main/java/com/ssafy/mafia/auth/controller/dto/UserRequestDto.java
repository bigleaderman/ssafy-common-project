package com.ssafy.mafia.auth.controller.dto;

import com.ssafy.mafia.Entity.Authority;
import com.ssafy.mafia.Entity.User;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserRequestDto {
    @ApiParam(value = "사용자 email", required = true)
    private String email;

    @ApiParam(value = "사용자 password", required = true)

    private String password;



    public User toUser(PasswordEncoder passwordEncoder) {
        return User.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .createdAt(LocalDate.now())
                .authority(Authority.ROLE_USER)
                .build();
    }

    public User toOauthUser(PasswordEncoder passwordEncoder){
        return User.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .createdAt(LocalDate.now())
                .isAuth(true)
                .isOauth(true)
                .authority(Authority.ROLE_USER)
                .build();
    }

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(email, password);
    }
}
