package com.ssafy.mafia.auth.service;


import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.auth.util.SecurityUtil;
import com.ssafy.mafia.auth.util.makeSecretnumberUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final EntityManager em;
    private final JavaMailSender javaMailSender;

    public void sendEmail(){
        int num = Integer.parseInt(makeSecretnumberUtil.numberGen(6,1));
        User user = em.find(User.class, SecurityUtil.getCurrentUserId());
        user.setEmailCode(num);

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("socialable@naver.com");
        simpleMailMessage.setTo(user.getEmail());
        simpleMailMessage.setSubject("[ICEWATER 커뮤니티 이메일 인증메일 입니다.]");
        simpleMailMessage.setText("<h1>메일인증</h1>" +
                "<br/>모두의싸피에 회원가입해주셔서 감사합니다."+
                "<br/>아래 [이메일 인증 확인]을 눌러주세요."+
                "<a href='http://localhost:8080/user/checkmail/" + user.getUserSeq() +
                "/" + num +
                ">이메일 인증 확인</a>");
        javaMailSender.send(simpleMailMessage);


    }


}
