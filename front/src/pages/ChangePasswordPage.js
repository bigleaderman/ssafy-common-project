import React from "react";
import styled from 'styled-components';
import { Container, Button } from '../style.js';


const ChangePasswordPage = (props) => {
  return (
    <Container>
        <span>비밀번호 변경</span>
        <Content>
            <label for="email">이메일</label>
            <input id="email" name="email"></input>
            <Button>이메일 인증</Button>
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