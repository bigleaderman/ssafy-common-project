import React, { useEffect, useState } from "react";
import { Container, styleButton, styleModal, styleTextField, styleContainer,
  styleModalkContainer, checkButton, smallButton, styleModalmiddleContainer } from '../style.js';
import { Modal, Box, Button, TextField, Paper } from '@mui/material';
import { useNavigate } from  "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import { positions } from "@mui/system";


const FindPasswordPage = (props) => {
  const navigate = useNavigate();

  const [emailAuthentication, setEmailAuthentication] = useState(false);
  const [resendEmail, setResendEmailOpen] = useState(false);
  const [emailCode, setEmailCode] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [userSeq, setUserSeq] = useState(null);
  const [changePassword, setChangePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (isDone && !modalOpen) {
      navigate('/signin');
    }
  });

  const handleResendEmailOpen = () => {
    setResendEmailOpen(true);
  };
  const handleResendEmailClose = () => {
    setResendEmailOpen(false);
  };

  const goEmailAuthentication = () => {
    //   handleModalOpen('이메일을 확인해주세요.');  // 유효성 검사
    sendEmail();
    setEmailAuthentication(true);
  };

  const sendEmail = () => {
    axios({
      method: 'post',
      url: '/api/sendEmail',
      headers: {
        'Content-Type': 'text/plain',
      },
      data: email,
    })
    .then((response) => {
      // console.log(response.data);
      setUserSeq(response.data)  // 유저 시퀀스 받아오기
      // console.log('이메일 보냄');
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
        // setModalOpen(false);
        // navigate('/ChangePasswordPage');
        setChangePassword(true);
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
  
  const updateUserPassword = () => {
    if (isSamePassword()) {
      axios({
        method: 'post',
        url: '/api/changePw',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          email,
          password
        },
      })
      .then((response) => {
        handleModalOpen('비밀번호가 변경되었습니다.');
        setIsDone(true);
        // setChangePassword(true);
      })
      .catch(error => {
        if (error.response.status === 401) {
          // setWrongInputData(true);
        }
      })
    } else {
      handleModalOpen('비밀번호가 다릅니다.');
    }
  }

  const isSamePassword = () => {
    return password === passwordCheck;
  };

  const handleModalOpen = (message) => {
    setModalMessage(message);
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
      >
        <Box sx={{ ...styleModal, width: 400, backgroundColor:'rgba(30,30,30,0.7)' }}>
          <h2 id="modal-title">{modalMessage}</h2>
          <Button sx={{...styleButton, width:35, position:'relative', left:130, top:20}} onClick={handleModalClose}>확인</Button>
        </Box>
      </Modal>

      { changePassword ?
        <Container>
          <Container style={styleModalmiddleContainer} component={Paper} >
          <h2 style={{color:"#dcdcdc", fontSize:35, marginBottom:20}}>비밀번호 변경</h2>
          <Content>
            <label  style={{color:"#828282", fontSize:20, margin:0}} htmlFor="password">비밀번호</label>
            <TextField sx={{...checkButton, height:60}} inputProps={{sx:{color:"#b4b4b4", fontSize:20}}} placeholder="비밀번호" 
            type="password" id="password" name="password" onChange={(e) => {setPassword(e.target.value)}}></TextField>
            <label style={{color:"#828282", fontSize:20, margin:0}} htmlFor="password-check">비밀번호 확인</label>
            <TextField sx={{...checkButton, height:60}} inputProps={{sx:{color:"#b4b4b4", fontSize:20}}} placeholder="비밀번호확인"
            style={styleTextField} type="password" id="password-check" name="password-check" onChange={(e) => {setPasswordCheck(e.target.value)}}></TextField>
          </Content>
          {!isSamePassword() ? <span>비밀번호가 다릅니다.</span> : null}

          <Button sx={{...styleButton, width:183, position:'relative', right:6}} onClick={updateUserPassword}>비밀번호 변경</Button>
          </Container>
        </Container>
      :
        ( emailAuthentication ?
          <Container>
            <Container style={styleModalkContainer} component={Paper} >
            <Content>
              <div style={{marginBottom:1}}>
                <h4 style={{color:"#828282", fontSize:30, marginBottom:10}}>이메일 인증</h4>
                <span style={{color:"#828282", fontSize:20}}>
                <p style={{marginBottom:3}}>인증 메일이 {email}(으)로 전송되었습니다.</p>
                {/* <p>이메일의 인증 버튼을 누르면 비밀번호 변경이 가능합니다.</p> */}
                <p>인증 코드를 입력창에 입력해주세요.</p>
                </span>
              </div>
              <TextField sx={{...checkButton, height:60}} inputProps={{sx:{color:"#b4b4b4", fontSize:20}}}  id="emailCode" name="emailCode" placeholder="이메일 코드" onChange={(e) => {setEmailCode(e.target.value);}}></TextField>
              <Button sx={{...styleButton, width:50, height:60, position:'relative', top:20 }} onClick={() => {checkEmailCode()}}>확인</Button>
            </Content>

            
            
            <Button sx={{...styleButton, width:265}} onClick={() => {sendEmail(); handleResendEmailOpen();}}>이메일 재전송</Button>
            {/* <Link to="/changepassword">메일 인증 시</Link>     비밀번호 변경 페이지 확인용(백 연결 시 지우기) */}
            </Container>
            <Modal
              open={resendEmail}
              onClose={handleResendEmailClose}
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
            <Container style={styleModalkContainer} component={Paper} >
            <h2 style={{color:"#828282", fontSize:30, marginBottom:10}}>비밀번호 찾기</h2>
            <Content>
              <TextField sx={{...checkButton, width:250}} inputProps={{sx:{color:"#b4b4b4", fontSize:20}}} id="email" name="email" placeholder="이메일" onChange={(e) => {setEmail(e.target.value)}}></TextField>
              {/* <Button style={styleButton} onClick={() => {if (email.length) goEmailAuthentication(); else handleModalOpen('이메일을 입력해주세요.');}}>중복검사</Button> */}
            </Content>
          
            <Button sx={{ ...smallButton, width:130}} onClick={() => {if (email.length) goEmailAuthentication(); else handleModalOpen('이메일을 입력해주세요.');}}>이메일 전송</Button>
            </Container>
            
          </Container>
        )
      }
    </>
  );
};

const Content = styled.div`
  overflow: hidden;
  display: block;
  text-align: center;
`

export default FindPasswordPage;