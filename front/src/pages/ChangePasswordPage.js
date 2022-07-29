import React, { useState } from "react";
import { Container, styleTextField, styleButton, styleModal } from '../style.js';
import { Modal, Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const ChangePasswordPage = (props) => {
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);

  const goSignInPage = () => {
    navigate("/signin")
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  return (
    <Container>
        <h2>비밀번호 변경</h2>
        <Content>
          <label htmlFor="password">비밀번호</label>
          <TextField style={styleTextField} type="password" id="password" name="password" variant="outlined"></TextField>
        </Content>
        <Content>
          <label htmlFor="password-check">비밀번호 확인</label>
          <TextField style={styleTextField} type="password" id="password-check" name="password-check" variant="outlined"></TextField>
        </Content>

        <Button style={styleButton} onClick={handleModalOpen}>비밀번호 변경</Button>

        <Modal
          open={modalOpen}
          onClose={goSignInPage}
          aria-labelledby="modal-title"
        >
          <Box sx={{ ...styleModal, width: 400 }}>
            <h2 id="modal-title">비밀번호가 변경되었습니다.</h2>
            <Button style={styleButton} onClick={goSignInPage}>확인</Button>
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

export default ChangePasswordPage;