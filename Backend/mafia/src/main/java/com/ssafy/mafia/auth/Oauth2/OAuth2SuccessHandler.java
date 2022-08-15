package com.ssafy.mafia.auth.Oauth2;

import com.ssafy.mafia.Entity.RefreshToken;
import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.auth.controller.dto.TokenDto;
import com.ssafy.mafia.auth.controller.dto.UserRequestDto;
import com.ssafy.mafia.auth.jwt.TokenProvider;
import com.ssafy.mafia.auth.repository.RefreshTokenRepository;
import com.ssafy.mafia.auth.repository.UserRepository;
import com.ssafy.mafia.auth.service.AuthService;
import com.ssafy.mafia.auth.util.makeSecretnumberUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final TokenProvider tokenProvider;

    private final PasswordEncoder passwordEncoder;
    private final EntityManager em;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User)authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        //유저가 없으면 유저를 DB에 먼저 넣기
        if (!userRepository.existsByEmail(email)) {
            // 회원가입을 위한 Dto 생성
            UserRequestDto userRequestDto = new UserRequestDto();
            userRequestDto.setEmail(email);
            userRequestDto.setPassword(makeSecretnumberUtil.numberGen(6,1));

            User user = userRequestDto.toOauthUser(passwordEncoder);
            userRepository.save(user);
        }
        UserRequestDto userRequestDto = new UserRequestDto();
        String password = em.createQuery("SELECT u FROM User u WHERE u.email like :email", User.class).setParameter("email", email).getSingleResult().getPassword();
        userRequestDto.setPassword(email);
        userRequestDto.setPassword(password);
        UsernamePasswordAuthenticationToken authenticationToken = userRequestDto.toAuthentication();
        Authentication authentication_user = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication_user);

        RefreshToken refreshToken = RefreshToken.builder()
                .key(authentication.getName())
                .value(tokenDto.getRefreshToken())
                .build();

        refreshTokenRepository.save(refreshToken);
    }
}