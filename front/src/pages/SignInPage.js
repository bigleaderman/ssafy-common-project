import React from "react";
import { Container, styleButton, styleTextField } from '../style.js';
import { Button, TextField } from '@mui/material';
import { Link } from  "react-router-dom";
import styled from 'styled-components';

const SignInPage = (props) => {
  return (
    <Container>
      <h2>로그인</h2>
      <Content>
        <label htmlFor="email">이메일</label>
        <TextField style={styleTextField} id="email" name="email" placeholder="이메일" variant="outlined"></TextField>
      </Content>
      <Content>
        <label htmlFor="password">비밀번호</label>
        <TextField style={styleTextField} type="password" id="password" name="password" placeholder="비밀번호" variant="outlined"></TextField>
      </Content>

      <p>
        <Link style={styleButton} to={`/signup`}>회원가입</Link>
        <Link style={styleButton} to={``}>비밀번호 찾기</Link>
      </p>

      <Button style={styleButton}>이메일로 로그인</Button>
      <Button style={styleButton}>카카오 로그인</Button>
      <Button style={styleButton}>구글 로그인</Button>

    </Container>
  );
};

const Content = styled.div`
  overflow: hidden;
  display: block;
  text-align: center;
`

export default SignInPage;