import React from "react";
import styled from 'styled-components';
import { Container, styleButton } from '../style.js';
import { Button } from '@mui/material';


const ChangePasswordPage = (props) => {
  return (
    <Container>
        <span>비밀번호 변경</span>
        <Content>
            <label for="email">이메일</label>
            <input id="email" name="email"></input>
            <Button style={styleButton} variant="outlined">이메일 인증</Button>
        </Content>
    </Container>
  );
};

const Content = styled.div`
  overflow: hidden;
  display: block;
  text-align: center;
`

export default ChangePasswordPage;