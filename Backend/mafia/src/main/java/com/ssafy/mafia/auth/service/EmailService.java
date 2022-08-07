package com.ssafy.mafia.auth.service;


import com.ssafy.mafia.Entity.RefreshToken;
import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.auth.controller.dto.TokenDto;
import com.ssafy.mafia.auth.controller.dto.UserRequestDto;
import com.ssafy.mafia.auth.jwt.TokenProvider;
import com.ssafy.mafia.auth.repository.RefreshTokenRepository;
import com.ssafy.mafia.auth.repository.UserRepository;
import com.ssafy.mafia.auth.util.makeSecretnumberUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.internet.MimeMessage;
import javax.persistence.EntityManager;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final EntityManager em;
    private final JavaMailSender mailSender;

    @Transactional
    public int sendEmail(String email) throws  Exception {
        int num = Integer.parseInt(makeSecretnumberUtil.numberGen(6,1));
        User user = em.createQuery("SELECT u FROM User u WHERE u.email like :email", User.class).setParameter("email", email).getSingleResult();
        User changeUser = em.find(User.class, user.getUserSeq());
        changeUser.setEmailCode(num);

        try {
            MimeMessage mail = mailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mail, true, "UTF-8");
            mimeMessageHelper.setFrom("socialable@naver.com");
            mimeMessageHelper.setTo(user.getEmail());
            mimeMessageHelper.setSubject("모두의마피아 이메일 인증메일 입니다.");
            mimeMessageHelper.setText("<h1>[모두의마피아]메일인증</h1>" +
                    "<br/>모두의마피아에 회원가입해주셔서 감사합니다."+
                    "<br/>아래 인증번호를 입력창에 입력하세요."+
                    "<br/>-------------------------------------------------" +
                    "<br/><h2> 이메일 인증 번호는 :" + num + "입니다</h2>" +
                    "<br/>감사합니다", true);
            mailSender.send(mail);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return user.getUserSeq();
    }

    @Transactional
    public boolean emailValidationUser(int num, int userId) {
        User user = em.find(User.class, userId);
        if (user.getEmailCode() == num ) {
            user.setAuth(true);
            return true;
        } else {
            return false;
        }
    }

}
