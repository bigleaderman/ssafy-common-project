import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { Container, styleButton, styleModal, styleTextField, styleModalkContainer, checkButton, checkStyleButton, smallButton, middleButton, styleContainer, styleTableContainer } from '../style.js';
import { Modal, Box, Button, TextField, makeStyles, Paper } from '@mui/material';
import { useNavigate } from  "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/slice/UserSlice";
import { logout } from "../redux/slice/UserSlice";
import axios from 'axios';


const MyPage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const userData = useSelector(state => state.user);
  const [confirmed, setConfirmed] = useState(null);
  const [withdrawalOpen, setWithdrawalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isValidNickname, setIsValidNickname] = useState(false);
  const [nickname, setNickname] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const token = useSelector(state => state.user.accessToken);
  const oauth = useSelector(state => state.user.oauth);

  useEffect(() => {
    if (modalOpen) {
      setWithdrawalOpen(false)
    }
    if (!withdrawalOpen && !modalOpen && !token) {
      navigate("/");
    }
  })

  const confirmPassword = () => {
    axios({
      method: 'post',
      url: '/api/user/checkPw',
      headers: {
        'Content-Type': 'text/plain',
        Authorization: 'Bearer ' + token,
      },
      data: password,
    })
    .then(response => {
      if (response.data) {
        axios({
          method: 'get',
          url: '/api/user/me',
          headers: {
            Authorization: 'Bearer ' + token,
          }
        })
        .then(response2 => {
          setPassword('');
          dispatch(getUser(response2.data));
          setConfirmed(response.data);
        })
      } else {
        handleModalOpen('틀린 비밀번호입니다.');
      }
    })
    .catch(error => {
      if (error.response.status === 401) {
        // setWrongInputData(true);
      }
    })
  };

  const checkNickname = () => {
    if (nickname.length === 0) {
      handleModalOpen('변경할 닉네임을 입력해주세요.');
    } else {
      axios({
        method: 'post',
        url: '/api/user/checkNickname',
        headers: {
          'Content-Type': 'text/plain',
          Authorization: 'Bearer ' + token,
        },
        data: nickname,
      })
      .then(response => {
        // console.log(response.data);
        if (response.data) {
          handleModalOpen('이미 사용 중인 닉네임입니다.');
        } else {
          setIsValidNickname(true);
          handleModalOpen('사용 가능한 닉네임입니다.');
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          // setWrongInputData(true);
        }
      })
    };
  };
  
  const winningP = () => {
    const total = userData.winCount + userData.loseCount;
    if (total > 0) {
      return userData.winCount / total;
    } else {
      return 0;
    }
  };
  
  const handleWithdrawalOpen = () => {
    setWithdrawalOpen(true);
  };
  const handleWithdrawalClose = () => {
    setWithdrawalOpen(false);
  };
  const doWithdrawal = () => {
    axios({
      method: 'delete',
      url: '/api/user/delete',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: null,
    })
    .then(() => {
      handleModalOpen('탈퇴하셨습니다.');
      dispatch(logout());
    })
    .catch(error => {
      setWithdrawalOpen(false);
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

  const updateUserInfo = () => {
    if (nickname.length > 0 && !isValidNickname) {
      handleModalOpen('닉네임 중복검사를 해주세요.');
    } else if (!isSamePassword()) {
      handleModalOpen('비밀번호를 확인해주세요.');
    } else {
      if (!nickname.length && !password.length) {
        handleModalOpen('수정된 내용이 없습니다.');
      }
      else {
        if (nickname.length > 0) {
          axios({
            method: 'put',
            url: '/api/user/enrollNickname',
            headers: {
              'Content-Type': 'text/plain',
              Authorization: 'Bearer ' + token,
            },
            data: nickname,
          })
          .then(() => {
            setNickname('');
            handleModalOpen('정보가 수정되었습니다.');
            axios({
              method: 'get',
              url: '/api/user/me',
              headers: {
                Authorization: 'Bearer ' + token,
              }
            })
            .then(response => {
              dispatch(getUser(response.data));
            })
          })
          .catch(error => {
            if (error.response.status === 401) {
              // setWrongInputData(true);
            }
          })
        }

        if (password.length > 0) {
          axios({
            method: 'post',
            url: '/api/changePw',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
            data: {
              email: userData.email,
              password,
            }
          })
          .then(() => {
            setPassword('');
            setPasswordCheck('');
            handleModalOpen('정보가 수정되었습니다.');
          })
          .catch(error => {
            if (error.response.status === 401) {
              // setWrongInputData(true);
            }
          })
        }
      }
    }
  }
  
  const isSamePassword = () => {
    return password === passwordCheck;
  };

  return (
    <>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
      >
        <Box sx={{ ...styleModal, width: 400, backgroundColor:'rgba(30,30,30,0.9)',  border: '3px solid #999' }}>
          <h2 id="modal-title">{modalMessage}</h2>
          <Button sx={{...styleButton, width:35, position:'relative', left:125, top:10}} onClick={handleModalClose}>확인</Button>
        </Box>
      </Modal>
      
      { (!oauth && !confirmed) ?
        <Container>
          <Container style={styleModalkContainer} component={Paper} >
            <Content>
              <h3 style={{color:"#828282", fontSize:22}} >비밀번호를 입력해주세요.</h3>
              <TextField style={checkButton} type="password" id="outlined-basic" placeholder="비밀번호" inputProps={{sx:{color:"#828282", fontSize:20}}} onChange={(e) => {setPassword(e.target.value)}} />
            </Content>
            <Content style={{width:300}}>
              <Button sx ={{...smallButton, position:"relative", right:10}} onClick={confirmPassword}>확인</Button>
              <Button sx={{ ...smallButton}} onClick={()=>navigate('/')}>취소</Button>
            </Content>
          </Container>
          </Container>
      :
        <Container>
          <Container style={{height:40}}></Container>
          <Container style={styleContainer} component={Paper}>
            <h1 style={{color:"#dcdcdc", fontSize:'3rem'}} >MyPage</h1>
            <Content style={{width:500}}>
              <label style={{color:"#dcdcdc", fontSize:20}}  htmlFor="nickname">닉네임 </label>
              <TextField sx={{...checkButton, position:"relative", left:52}} id="nickname" name="nickname" inputProps={{sx:{color:"#b4b4b4", fontSize:20}}}
              placeholder={userData.nickname} value={nickname} onChange={(e) => {setIsValidNickname(false); setNickname(e.target.value);}}></TextField>
              <Button sx={{...checkStyleButton, position:"relative", left:52}} onClick={() => {checkNickname()}}>중복검사</Button>
            </Content>
            <Content>
              <label style={{color:"#dcdcdc", marginBottom:5, fontSize:20, height:20}}  htmlFor="email">이메일 </label>
              <p style={{color:"#b4b4b4", fontSize:'1.5em' }}>{userData.email}</p>
              {/* <TextField style={styleTextField} id="email" name="email" placeholder="이메일" onChange={(e) => {setEmail(e.target.value)}}></TextField> */}
              {/* <Button style={styleButton} onClick={() => {checkEmail()}}>중복검사</Button> */}
            </Content>
            <Content>
              <label style={{color:"#dcdcdc" , fontSize:20, height:20}} htmlFor="password" >비밀번호 </label>
              <TextField style={checkButton} type="password" id="password" name="password" value={password} 
              placeholder="비밀번호 변경" inputProps={{sx:{color:"#b4b4b4", fontSize:20}}}
              onChange={(e) => {setPassword(e.target.value)}}></TextField>
            </Content>
            <Content>
              <label style={{color:"#dcdcdc", fontSize:20, height:20}} htmlFor="password-check">비밀번호 확인 </label>
              <TextField style={checkButton} type="password" id="password-check" name="password-check" value={passwordCheck} 
              placeholder="비밀번호 변경" inputProps={{sx:{color:"#b4b4b4", fontSize:20}}} onChange={(e) => {setPasswordCheck(e.target.value)}}></TextField>
            </Content>
            {!isSamePassword() ? <span>비밀번호가 다릅니다.</span> : null}
            <Content>
              <label style={{color:"#b4b4b4", fontSize:20}} >가입일자 </label>
              <span style={{color:"#b4b4b4", fontSize:20}} id="signup-date">2022.07.25</span>
            </Content>
            <Content sx={{ marginY : 3, fontSize:20}} >
              <div style={{color:"#b4b4b4", fontSize:20}} id="record">
                <label>전적 </label>
                <span>{userData.winCount}</span>
                <span>승 </span>
                <span>{userData.loseCount}</span>
                <span>패 </span>
                <span>{winningP()}</span> 
                <span>%</span>
              </div>
            </Content>
            <p style={{color:"#B90000", marginBottom:10}}> {userData.redUser ? <span >당신은 Red User입니다. 매너있는 게임 플레이를 해주세요.</span> : null} </p>
            
            
            <span>
              <Button style={middleButton} onClick={updateUserInfo}>정보수정</Button>
              <Button style={middleButton} onClick={handleWithdrawalOpen}>탈퇴하기</Button>
              <Button style={middleButton} onClick={() => navigate('/')}>뒤로가기</Button>
            </span>
            <Modal
              open={withdrawalOpen}
              onClose={handleWithdrawalClose}
              aria-labelledby="withdrawal-modal-title"
            >
              <Box sx={{ ...styleModal, width: 400 }}>
                <h2 id="withdrawal-modal-title">정말 탈퇴하시겠습니까?</h2>
                <Button sx={{...middleButton, marginBottom:30}} onClick={doWithdrawal}>탈퇴</Button>
                <Button sx={{...middleButton, marginBottom:30}} onClick={handleWithdrawalClose}>취소</Button>
              </Box>
            </Modal>
          </Container>
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

export default MyPage;