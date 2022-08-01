package com.ssafy.mafia.auth.service;


import com.ssafy.mafia.Entity.User;
import com.ssafy.mafia.auth.controller.dto.UserRequestDto;
import com.ssafy.mafia.auth.controller.dto.UserResponseDto;
import com.ssafy.mafia.auth.repository.UserRepository;
import com.ssafy.mafia.auth.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.Optional;


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
    public Boolean checkEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Transactional(readOnly = true)
    public Boolean checkNickname(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    @Transactional(readOnly = false)
    public User enrollNickname(String nickname) {
        User user = em.find(User.class, SecurityUtil.getCurrentUserId());
        user.setNickname(nickname);
        return user;
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
    public User changePw(String password) {
        User user = em.find(User.class, SecurityUtil.getCurrentUserId());
        user.setPassword(passwordEncoder.encode(password));
        return user;

    }

    @Transactional
    public boolean validationUser(int userId, int num) throws Exception {
        User user = em.find(User.class, userId);
        if (user.getEmailCode() == num ) {
            user.setAuth(true);
            return true;
        }
        else{
            return false;
        }
    }
 }
