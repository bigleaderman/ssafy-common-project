import React, { useState } from "react";
import { Container, styleButton, styleModal, styleTextField } from '../style.js';
import { Modal, Box, Button, TextField } from '@mui/material';
import { Link, useNavigate } from  "react-router-dom";
import styled from 'styled-components';


const FindPasswordPage = (props) => {

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
            <p>이메일의 인증 버튼을 누르면 비밀번호 변경이 가능합니다.</p>
            </span>
          </div>
        </Content>
        
        <Button style={styleButton} onClick={() => {handleResendEmailOpen()}}>이메일 재전송</Button>
        <Link to="/changepassword">메일 인증 시</Link>     {/* 비밀번호 변경 페이지 확인용(백 연결 시 지우기) */}
        
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
        <h2>비밀번호 찾기</h2>
        <Content>
          <label htmlFor="email">이메일</label>
          <TextField style={styleTextField} id="email" name="email" placeholder="이메일" variant="outlined"></TextField>
        </Content>
      
        <Button style={styleButton} onClick={() => {goEmailAuthentication()}}>이메일 전송</Button>
      </Container>
  );
};

const Content = styled.div`
  overflow: hidden;
  display: block;
  text-align: center;
`

export default FindPasswordPage;