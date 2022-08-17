import React, { useState } from "react";
import { Container, styleButton, styleModal, styleTextField } from '../style.js';
import { Modal, Box, Button, TextField } from '@mui/material';
import { Link } from  "react-router-dom";
import styled from 'styled-components';


const SignUpPage = (props) => {
  const [emailAuthentication, setEmailAuthentication] = useState(false);
  const [resendEmail, setResendEmailOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [value, setValue] = useState('');

  const handleResendEmailOpen = () => {
    setResendEmailOpen(true);
  };
  const handleResendEmailClose = () => {
    setResendEmailOpen(false);
  };

  const goEmailAuthentication = () => {
    setEmailAuthentication(true);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    emailAuthentication ?
      <Container>
        <Content>
          <div>
            <h4>인증 메일이 발송되었습니다.</h4>
            <span>
            <p>메일함에서 인증 메일을 확인하시기 바랍니다.</p>
            <p>이메일의 인증 버튼을 누르면 회원가입이 완료됩니다.</p>
            </span>
          </div>
        </Content>
        
        <Button style={styleButton} onClick={() => {handleResendEmailOpen()}}>이메일 재전송</Button>
        <Link to="/welcome">메일 인증 시</Link>     {/* 환영 페이지 확인용(백 연결 시 지우기) */}
        
        <Modal
          open={resendEmail}
          onClose={handleModalClose}
          aria-labelledby="modal-title"
        >
          <Box sx={{ ...styleModal, width: 400 }}>
            <h2 id="modal-title">인증 메일을 재전송했습니다.</h2>
            <Button style={styleButton} onClick={handleResendEmailClose}>확인</Button>
          </Box>
        </Modal>
      </Container>
      :
      
    <Container>
      <h2>회원가입</h2>
      <Content>
        <label htmlFor="email">이메일</label>
        <TextField style={styleTextField} id="email" name="email" placeholder="이메일" variant="outlined"></TextField>
        <Button style={styleButton} onClick={() => {setValue('이메일'); handleModalOpen();}}>중복검사</Button>
      </Content>
      <Content>
        <label htmlFor="password">비밀번호</label>
        <TextField style={styleTextField} type="password" id="password" name="password" variant="outlined"></TextField>
      </Content>
      <Content>
        <label htmlFor="password-check">비밀번호 확인</label>
        <TextField style={styleTextField} type="password" id="password-check" name="password-check" variant="outlined"></TextField>
      </Content>
    
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
      >
        <Box sx={{ ...styleModal, width: 400 }}>
          <h2 id="modal-title">이미 사용 중인 {value}입니다.</h2>
          <Button style={styleButton} onClick={handleModalClose}>확인</Button>
        </Box>
      </Modal>
    
      <Button style={styleButton} onClick={() => {goEmailAuthentication();}}>이메일로 회원가입</Button>
    </Container>
  );
};

const Content = styled.div`
  overflow: hidden;
  display: block;
  text-align: center;
`

export default SignUpPage;