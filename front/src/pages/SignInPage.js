import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Container, styleButton, styleTextField } from '../style.js';
import { Button, TextField } from '@mui/material';
import { Link } from  "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import { login } from "../redux/slice/UserSlice";
import { useNavigate } from  "react-router-dom";


const SignInPage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onClickLogin = () => {
    axios({
      method: 'post',
      url: '/api/login',
      data: {
        email,
        password,
      }
    })
    .then(response => {
      dispatch(login(response.data));
      navigate("/");
    });
  }

  return (
    <Container>
      <h2>로그인</h2>
      
      <Content>
        <label htmlFor="email">이메일</label>
        <TextField style={styleTextField} id="email" name="email" placeholder="이메일" onChange={(e) => {setEmail(e.target.value)}}></TextField>
      </Content>
      <Content>
        <label htmlFor="password">비밀번호</label>
        <TextField style={styleTextField} type="password" id="password" name="password" placeholder="비밀번호" onChange={(e) => {setPassword(e.target.value)}}></TextField>
      </Content>
      <Button style={styleButton} onClick={onClickLogin}>로그인</Button>

      <p>
        <Link style={styleButton} to={`/signup`}>회원가입</Link>
        <Link style={styleButton} to={`/findpassword`}>비밀번호 찾기</Link>
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