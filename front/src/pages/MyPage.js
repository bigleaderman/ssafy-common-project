import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Button, styleModal } from '../style.js';
import { Modal, Box } from '@mui/material';


const MyPage = (props) => {
  const [user, setUser] = useState(null);
  const [withdrawalOpen, setWithdrawalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [value, setValue] = useState('');

  const confirmPassword = () => {
    setUser(true);
  };

  const handleWithdrawalOpen = () => {
    setWithdrawalOpen(true);
  };
  const handleWithdrawalClose = () => {
    setWithdrawalOpen(false);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    !user ? 
    <Container>
      <Content>
        <span>비밀번호를 입력해주세요</span>
      </Content>
      <Content>
        <input type="password"></input>
      </Content>
      <Content>
        <Button onClick={confirmPassword}>확인</Button>
        <Button>취소</Button>
      </Content>
    </Container>
  :
    <Container>
      <span>MyPage</span>
      <Content>
        <label htmlFor="email">이메일</label>
        <input id="email" name="email"></input>
        <Button onClick={() => {setValue('이메일'); handleModalOpen();}}>중복검사</Button>
      </Content>
      <Content>
        <label htmlFor="nickname">닉네임</label>
        <input id="nickname" name="nickname"></input>
        <Button onClick={() => {setValue('닉네임'); handleModalOpen();}}>중복검사</Button>
      </Content>
      <Content>
        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" name="password"></input>
      </Content>
      <Content>
        <label htmlFor="password-check">비밀번호 확인</label>
        <input type="password" id="password-check" name="password-check"></input>
      </Content>
      <Content>
        <label>가입일자 </label>
        <span id="signup-date">2022.07.25</span>
      </Content>
      <Content>
        <div id="record">
          <label>전적 </label>
          <span>17</span>
          <span>승 </span>
          <span>5</span>
          <span>패 </span>
          <span>77.3</span>
          <span>%</span>
        </div>
      </Content>
      <span>당신은 Red User입니다. 매너있는 게임 플레이를 해주세요.</span>
      <span>
        <Button>정보 수정</Button>
        <Button onClick={handleWithdrawalOpen}>탈퇴하기</Button>
        <Button>뒤로 가기</Button>
      </span>

      <Modal
        open={withdrawalOpen}
        onClose={handleWithdrawalClose}
        aria-labelledby="withdrawal-modal-title"
      >
        <Box sx={{ ...styleModal, width: 400 }}>
          <h2 id="withdrawal-modal-title">정말 탈퇴하시겠습니까?</h2>
          <Button onClick={handleWithdrawalClose}>탈퇴</Button>
          <Button onClick={handleWithdrawalClose}>취소</Button>
        </Box>
      </Modal>

      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
      >
        <Box sx={{ ...styleModal, width: 400 }}>
          <h2 id="modal-title">이미 사용 중인 {value}입니다.</h2>
          <Button onClick={handleModalClose}>확인</Button>
        </Box>
      </Modal>

    </Container>
  );
};

const Content = styled.div`
  overflow: hidden;
  display: block;
  text-align: center;
`

export default MyPage;