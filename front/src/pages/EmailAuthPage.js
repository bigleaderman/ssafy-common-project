import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, styleButton, styleModal, EmailValidationstyleTextField, checkButton, smallButton,middleButton } from '../style.js';
import { Modal, Box, Button, TextField, Card, Grid } from '@mui/material';
import { useNavigate } from  "react-router-dom";
import { getUser } from "../redux/slice/UserSlice";
// import styled from 'styled-components';
import axios from 'axios';
import "../CSS/EmailValidation.css";
import { red } from "@mui/material/colors";


const SignUpPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [resendEmail, setResendEmailOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [emailCode, setEmailCode] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const email = useSelector(state => state.user.email);
  const auth = useSelector(state => state.user.auth);
  const userSeq = useSelector(state => state.user.userSeq);
  const token = useSelector(state => state.user.accessToken);

  useEffect(() => {
    goEmailAuth();
  }, []);

  const handleResendEmailOpen = () => {
    setResendEmailOpen(true);
    goEmailAuth();
  };
  const handleResendEmailClose = () => {
    setResendEmailOpen(false);
  };

  const goEmailAuth = () => {
    auth ? navigate('/welcome') : sendEmail()
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
      if (response.data) {
        axios({
          method: 'get',
          url: '/api/user/me',
          headers: {
              Authorization: `Bearer ` + token,
          }
        })
        .then(response2 => {
          if (response2.data.auth) {
            dispatch(getUser(response2.data));
            navigate('/welcome');
          }
        })
      } else {
        handleModalOpen('인증 코드가 일치하지 않습니다.');
      }
    })
    .catch(error => {
      if (error.response.status === 401) {
        // setWrongInputData(true);
      } else if (error.response.status === 400) {
        handleModalOpen('인증 코드가 일치하지 않습니다.');
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
        <Box sx={{ ...styleModal, width: 1000,  }}>
          <h2 id="modal-title">{modalMessage}</h2>
          <Button style={styleButton} onClick={handleModalClose}>확인</Button>
        </Box>
      </Modal>
      <Container>
        
        <Card sx={{width:480, height:300, backgroundColor:'rgba(0, 0, 0, 0.3)', borderRadius:4, border:'solid 2px #b4b4b4'}}>
            <h2 style={{marginBottom:10, marginTop:40, color:'#b4b4b4'}}>인증 코드 입력</h2>
            <h3 style={{marginBottom:10, marginTop:10, color:'#b4b4b4'}}>제공하신 이메일 주소로 인증 코드를 보냈습니다.</h3>
          <Grid sx={{marginTop:3}} container >
            <Grid item xs="9">
              <TextField sx={{...EmailValidationstyleTextField, border:'solid 2px #b4b4b4'}} inputProps={{sx:{color:"#b4b4b4", fontSize:20}}} id="emailCode" name="emailCode" placeholder="이메일 코드" onChange={(e) => {setEmailCode(e.target.value);}}></TextField>
            </Grid>
            <Grid item xs="1">
              <Button sx={{ ...smallButton, width: 80, marginY : 1, position:'relative', bottom:7, right:52, height:63}} onClick={() => {checkEmailCode()}}>확인</Button>
            </Grid>
          </Grid>
          <br/>
          <Button sx={{...styleButton, color:"#b4b4b4", position:'relative', bottom:10, width:200}} onClick={() => {handleResendEmailOpen()}}>이메일 재전송</Button>
        </Card>
          
        <Modal
          open={resendEmail}
          onClose={handleModalClose}
          aria-labelledby="modal-title"
        >
          <Box sx={{ ...styleModal, width: 420, border:'solid 2px #b4b4b4' }}>
            <h2 id="modal-title">인증 메일을 재전송했습니다.</h2>
            <Button sx={{...middleButton, position:'relative', left:110, border:'solid 2px #b4b4b4'}} onClick={handleResendEmailClose}>확인</Button>
          </Box>
        </Modal>
      </Container>
    </>
  );
};

export default SignUpPage;