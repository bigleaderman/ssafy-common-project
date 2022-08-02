import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, styleButton, styleModal, styleTextField } from '../style.js';
import { Modal, Box, Button, TextField } from '@mui/material';
import { Link, useNavigate, Navigate } from  "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import { login } from "../redux/slice/UserSlice";


const SignInPage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wrongInputData, setWrongInputData] = useState(false);
  const [isRedirect] = useState(useSelector(state => state.user.accessToken)); 

  const handleWrongInputDataClose = () => {
    setWrongInputData(false);
  };

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
    })
    .catch(error => {
      if (error.response.status === 401) {
        setWrongInputData(true);
      }
    })
  }
  
  return (
    <Container>
      { isRedirect && <Navigate to="/"/> }
      { wrongInputData ?
          <Modal
            open={wrongInputData}
            onClose={handleWrongInputDataClose}
            aria-labelledby="modal-title"
          >
            <Box sx={{ ...styleModal, width: 400 }}>
              <h2 id="modal-title">존재하지 않는 이메일이거나 틀린 비밀번호입니다.</h2>
              <Button style={styleButton} onClick={handleWrongInputDataClose}>확인</Button>
            </Box>
          </Modal>
      : null }

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