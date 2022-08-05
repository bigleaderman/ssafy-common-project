import React, { useState } from "react";
import { Container, styleButton, styleModal, styleTextField } from '../style.js';
import { Modal, Box, Button, TextField } from '@mui/material';
import { Link, useNavigate } from  "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';


const SignUpPage = (props) => {
  const [emailAuthentication, setEmailAuthentication] = useState(false);
  const [resendEmail, setResendEmailOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [emailCode, setEmailCode] = useState('');
  const [isValidEmail, setIsValidEmail] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [userSeq, setUserSeq] = useState(null);

  const navigate = useNavigate();
  
  const handleResendEmailOpen = () => {
    setResendEmailOpen(true);
    goEmailAuthentication();
  };
  const handleResendEmailClose = () => {
    setResendEmailOpen(false);
  };

  const goEmailAuthentication = () => {
    if ( !isValidEmail) {
      handleModalOpen('이메일 중복검사를 해주세요.');
    } else if (!isSamePassword()) {
      handleModalOpen('비밀번호가 다릅니다.');
    } else {
      setEmailAuthentication(true);
      
      userSeq ? sendEmail() : signup()
    }
  };

  const signup = () => {
    axios({
      method: 'post',
      url: '/api/signup',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email,
        password,
      },
    })
    .then((response) => {
      // console.log('회원 정보 등록');
      setUserSeq(response.data.userSeq);
      sendEmail();
    })
    .catch(error => {
      if (error.response.status === 401) {
        // setWrongInputData(true);
      }
    })
  }

  const sendEmail = () => {
    axios({
      method: 'post',
      url: '/api/sendEmail',
      headers: {
        'Content-Type': 'text/plain',
      },
      data: email,
    })
    .then(() => {
      // console.log('이메일 보냄');
    })
    .catch(error => {
      if (error.response.status === 401) {
        // setWrongInputData(true);
      }
    })
  }

  const handleModalOpen = (message) => {
    setModalMessage(message);
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const isSamePassword = () => {
    return password === passwordCheck;
  };

  const checkEmail = () => {
    axios({
      method: 'post',
      url: '/api/checkEmail',
      headers: {
        'Content-Type': 'text/plain',
      },
      data: email,
    })
    .then(response => {
      if (response.data) {
        handleModalOpen('이미 사용 중인 아이디입니다.');
      }
      else {
        setIsValidEmail(true);
        handleModalOpen('사용 가능한 아이디입니다.');
      }
    })
    .catch(error => {
      if (error.response.status === 401) {
        // setWrongInputData(true);
      }
    })
  }

  const checkEmailCode = () => {
    
    axios({
      method: 'put',
      url: `/api/emailValidationUser/${userSeq}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: emailCode,
    })
    .then((response) => {
      // console.log(response.data);
      if (response.data) {
        setModalOpen(false);
        navigate('/welcome');
      } else {
        handleModalOpen('인증 코드가 일치하지 않습니다.');
      }
    })
    .catch(error => {
      if (error.response.status === 401) {
        // setWrongInputData(true);
      }
    })
  }
  
  return (
    <>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
      >
        <Box sx={{ ...styleModal, width: 400 }}>
          <h2 id="modal-title">{modalMessage}</h2>
          <Button style={styleButton} onClick={handleModalClose}>확인</Button>
        </Box>
      </Modal>
      { emailAuthentication ?
        <Container>
          <Content>
            <div>
              <h4>인증 메일이 발송되었습니다.</h4>
              <span>
              <p>메일함에서 인증 메일을 확인하시기 바랍니다.</p>
              {/* <p>이메일의 인증 버튼을 누르면 회원가입이 완료됩니다.</p> */}
              <p>이메일의 코드를 입력하면 회원가입이 완료됩니다.</p>
              </span>
            </div>
          <TextField style={styleTextField} id="emailCode" name="emailCode" placeholder="이메일 코드" onChange={(e) => {setEmailCode(e.target.value);}}></TextField>
          <Button style={styleButton} onClick={() => {checkEmailCode()}}>확인</Button>
          </Content>
          
          <Button style={styleButton} onClick={() => {handleResendEmailOpen()}}>이메일 재전송</Button>
          
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
            <TextField style={styleTextField} id="email" name="email" placeholder="이메일" onChange={(e) => {setIsValidEmail(false); setEmail(e.target.value);}}></TextField>
            <Button style={styleButton} onClick={() => {if (email.length) checkEmail(); else handleModalOpen('이메일을 입력해주세요.');}}>중복검사</Button>
          </Content>
          <Content>
            <label htmlFor="password">비밀번호</label>
            <TextField style={styleTextField} type="password" id="password" name="password" onChange={(e) => {setPassword(e.target.value)}}></TextField>
          </Content>
          <Content>
            <label htmlFor="password-check">비밀번호 확인</label>
            <TextField style={styleTextField} type="password" id="password-check" name="password-check" onChange={(e) => {setPasswordCheck(e.target.value)}}></TextField>
          </Content>

          {!isSamePassword() ? <span>비밀번호가 다릅니다.</span> : null}

          <Button style={styleButton} onClick={() => {goEmailAuthentication();}}>이메일로 회원가입</Button>
        </Container>
      }
    </>
  );
};

const Content = styled.div`
  overflow: hidden;
  display: block;
  text-align: center;
`

export default SignUpPage;