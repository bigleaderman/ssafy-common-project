package com.ssafy.mafia.auth.service;


import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.auth.util.makeSecretnumberUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.internet.MimeMessage;
import javax.persistence.EntityManager;

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
