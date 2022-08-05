package com.ssafy.mafia.auth.service;


import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.Entity.UserStatus;
import com.ssafy.mafia.auth.controller.dto.UserInfoResponseDto;
import com.ssafy.mafia.auth.controller.dto.UserRequestDto;
import com.ssafy.mafia.auth.repository.UserRepository;
import com.ssafy.mafia.auth.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;


@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final EntityManager em;

    private final PasswordEncoder passwordEncoder;



    @Transactional(readOnly=true)
    public User getUserInfo(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("유저 정보가 없습니다."));
    }

    @Transactional(readOnly=true)
    public User getMyInfo() {
        // SecurityUtil.getCurrentUserId() 여기서 UserSeq를 받아오기 때문에
        return userRepository.findById(SecurityUtil.getCurrentUserId())
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
    }

    @Transactional(readOnly = true)
    public boolean checkEmail(String email) {
        return userRepository.existsByEmail(email);
        //em.createQuery("SELECT m.UserSeq FROM USER m WHERE m.email=:email", User.class).setParameter("email", email).getSingleResult();
    }

    @Transactional(readOnly = true)
    public boolean checkNickname(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    @Transactional(readOnly = false)
    public UserInfoResponseDto enrollNickname(String nickname) {
        if (userRepository.existsByNickname(nickname)) {
            throw new RuntimeException("이미 등록된 닉네임입니다");
        }
        User user = em.find(User.class, SecurityUtil.getCurrentUserId());
        user.setNickname(nickname);
        return UserInfoResponseDto.convert(user);
    }

    @Transactional(readOnly = false)
    public void deleteUser() {
        User user = em.find(User.class, SecurityUtil.getCurrentUserId());
        userRepository.delete(user);
    }

    @Transactional(readOnly = true)
    public boolean checkPw(String password) {
        User user = em.find(User.class, SecurityUtil.getCurrentUserId());

        return  passwordEncoder.matches(password, user.getPassword());
    }

    @Transactional
    public void changePw(UserRequestDto userRequestDto) {
        User user = em.createQuery("SELECT u FROM User u WHERE u.email like :email", User.class).setParameter("email", userRequestDto.getEmail()).getSingleResult();
        User changeUser = em.find(User.class, user.getUserSeq());
        changeUser.setPassword(passwordEncoder.encode(userRequestDto.getPassword()));
        //return user;

    }

    @Transactional
    public void validationUser(int userId, int num) throws Exception {
        User user = em.find(User.class, userId);
        if (user.getEmailCode() == num ) {
            user.setAuth(true);
        }
    }

    @Transactional(readOnly = true)
    public User userInformation(String nickname) {
        return userRepository.findByNickname(nickname)
                .orElseThrow(() -> new RuntimeException("유저 정보가 없습니다."));
    }

    @Transactional(readOnly = true)
    public List isLoginUser() {
        return  em.createQuery("SELECT u.nickname, u.winCount, u.loseCount, u.rankPoint, u.isRedUser, u.nowRoomSeq FROM User u WHERE u.isLogin = true").getResultList();
    }

    @Transactional
    public void statusChange(String status) {
        User user = em.find(User.class, SecurityUtil.getCurrentUserId());
        user.setUserStatus(UserStatus.valueOf(status));
    }
 }
