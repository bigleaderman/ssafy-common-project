package com.ssafy.mafia.auth.controller;

import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.auth.Oauth2.KakaoService;
import com.ssafy.mafia.auth.Oauth2.SocialService;
import com.ssafy.mafia.auth.controller.dto.TokenDto;
import com.ssafy.mafia.auth.controller.dto.UserRequestDto;
import com.ssafy.mafia.auth.jwt.TokenProvider;
import com.ssafy.mafia.auth.repository.UserRepository;
import com.ssafy.mafia.auth.util.makeSecretnumberUtil;
import lombok.RequiredArgsConstructor;
import org.hibernate.cfg.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class KakaoUserController {
    private final SocialService socialService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EntityManager em;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    private final TokenProvider tokenProvider;

    @GetMapping("/oauth/callback/{provider}")
    public ResponseEntity<?> oauth2AuthorizationKakao(@PathVariable String provider,
            @RequestParam("code") String code) {
        UserRequestDto userRequestDto = new UserRequestDto();
        if (provider.equals("kakao")) {
            userRequestDto = socialService.verificationKakao(code);
        }
        else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);

        }
        String email = userRequestDto.getEmail();
        System.out.println(email);
        Optional<User> user = userRepository.findByEmail(email);

        if (!userRepository.existsByEmail(userRequestDto.getEmail())){
            userRequestDto.setPassword(email);
            User users = userRequestDto.toOauthUser(passwordEncoder);
            userRepository.save(users);
        }
        UserRequestDto userRequestDto2 = new UserRequestDto();
        String password = em.createQuery("SELECT u FROM User u WHERE u.email like :email", User.class).setParameter("email", email).getSingleResult().getPassword();
        userRequestDto2.setEmail(email);
        userRequestDto2.setPassword(email);
        UsernamePasswordAuthenticationToken authenticationToken = userRequestDto2.toAuthentication();
        Authentication authentication_user = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        System.out.println(authentication_user);

        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication_user);
        System.out.println(tokenDto);

        return ResponseEntity.ok(tokenDto);

    }
}
