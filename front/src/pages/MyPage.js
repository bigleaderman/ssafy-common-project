import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, styleButton, styleModal, styleTextField } from '../style.js';
import { Modal, Box, Button, TextField } from '@mui/material';


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
        <h3>비밀번호를 입력해주세요.</h3>
        <TextField type="password" id="outlined-basic" placeholder="비밀번호" variant="outlined" />
      </Content>
      <Content>
        <Button style={styleButton} variant="outlined" onClick={confirmPassword}>확인</Button>
        <Button style={styleButton} variant="outlined">취소</Button>
      </Content>
    </Container>
  :
    <Container>
      <h2>MyPage</h2>
      <Content>
        <label htmlFor="email">이메일</label>
        <TextField style={styleTextField} id="email" name="email" placeholder="이메일" variant="outlined"></TextField>
        <Button style={styleButton} variant="outlined" onClick={() => {setValue('이메일'); handleModalOpen();}}>중복검사</Button>
      </Content>
      <Content>
        <label htmlFor="nickname">닉네임</label>
        <TextField style={styleTextField} id="nickname" name="nickname" placeholder="닉네임" variant="outlined"></TextField>
        <Button style={styleButton} variant="outlined" onClick={() => {setValue('닉네임'); handleModalOpen();}}>중복검사</Button>
      </Content>
      <Content>
        <label htmlFor="password">비밀번호</label>
        <TextField style={styleTextField} type="password" id="password" name="password" variant="outlined"></TextField>
      </Content>
      <Content>
        <label htmlFor="password-check">비밀번호 확인</label>
        <TextField style={styleTextField} type="password" id="password-check" name="password-check" variant="outlined"></TextField>
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
        <Button style={styleButton} variant="outlined">정보 수정</Button>
        <Button style={styleButton} variant="outlined" onClick={handleWithdrawalOpen}>탈퇴하기</Button>
        <Button style={styleButton} variant="outlined">뒤로 가기</Button>
      </span>

      <Modal
        open={withdrawalOpen}
        onClose={handleWithdrawalClose}
        aria-labelledby="withdrawal-modal-title"
      >
        <Box sx={{ ...styleModal, width: 400 }}>
          <h2 id="withdrawal-modal-title">정말 탈퇴하시겠습니까?</h2>
          <Button style={styleButton} variant="outlined" onClick={handleWithdrawalClose}>탈퇴</Button>
          <Button style={styleButton} variant="outlined" onClick={handleWithdrawalClose}>취소</Button>
        </Box>
      </Modal>

      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
      >
        <Box sx={{ ...styleModal, width: 400 }}>
          <h2 id="modal-title">이미 사용 중인 {value}입니다.</h2>
          <Button style={styleButton} variant="outlined" onClick={handleModalClose}>확인</Button>
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