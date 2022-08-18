import React, { useState } from "react";
// import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, getUser } from "../redux/slice/UserSlice";
import { Container, styleButton, styleModal, middleButton} from '../style.js';
import { Modal, Box, Button,} from '@mui/material';
import { Link, useNavigate, Navigate } from  "react-router-dom";
import axios from 'axios';
import '../CSS/Login.css';
import { style } from "@mui/system";
import styled from 'styled-components';
import validator from 'validator'



const SignInPage = (props) => {

  //로그인을 위한 코드
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wrongInputData, setWrongInputData] = useState(false);
  const [isRedirect] = useState(useSelector(state => state.user.accessToken));

  const handleWrongInputDataClose = () => {
    setWrongInputData(false);
  };

  const clickKakaoLogin = () => {
    console.log("kakao 로그인");
    window.open('https://kauth.kakao.com/oauth/authorize?client_id=9e9b8aade342d72cf01ce50e6136e7e1&redirect_uri=https://i7d106.p.ssafy.io/oauth/callback/kakao&response_type=code', '_self');
  }


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
      dispatch(login({...response.data, email}));
      axios({
        method: 'get',
        url: '/api/user/me',
        headers: {
            Authorization: `Bearer ` + response.data.accessToken,
        }
      })
      .then(response2 => {
        dispatch(getUser(response2.data));
        if (response2.data.auth) {
          navigate("/");
        } else {
          navigate("/emailAuth");
        }
      })
    })
    .catch(error => {
      if (error.response.status === 401) {
        setWrongInputData(true);
      }
    })
  }

  // 회원가입을 위한 코드
  const [modalOpen, setModalOpen] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpPasswordCheck, setSignUpPasswordCheck] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [emailcheck, setEmailcheck] = useState(false);
  const userSeq = useSelector(state => state.user.userSeq);

  const goEmailAuthPage = () => {
    if ( !isValidEmail) {
      handleModalOpen('이메일 중복검사를 해주세요.');
    } else if (!isSamePassword()) {
      handleModalOpen('비밀번호가 다릅니다.');
    } else {
      userSeq ? navigate('/emailauth') : signup()
    }
  };

  const validationPassword = () => {
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (signUpPassword.match(passw)){
      return true
    }
    else {
      return false
    }
  }

  const signup = () => {
    axios({
      method: 'post',
      url: '/api/signup',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email: signUpEmail,
        password: signUpPassword,
      },
    })
    .then(() => {
      
      changeForm();
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

  const emailcheckModalOpen = () => {
    setEmailcheck(true);
  }

  const emailcheckModalClose = () => {
    setEmailcheck(false);
  }

  const isSamePassword = () => {
    return signUpPassword === signUpPasswordCheck;
  };

  const checkEmail = () => {
    if (validator.isEmail(signUpEmail)) {
      axios({
        method: 'post',
        url: '/api/checkEmail',
        headers: {
          'Content-Type': 'text/plain',
        },
        data: signUpEmail,
      })
      .then(response => {
        if (response.data) {
          handleModalOpen('이미 사용 중인 이메일입니다.');
        }
        else {
          setIsValidEmail(true);
          handleModalOpen('사용 가능한 이메일입니다.');
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          // setWrongInputData(true);
        }
      })
    }
    else {
      handleModalOpen('이메일 형식으로 입력하세요.')
    }
    
  }

  //css를 위한 코드
  const [check, setCheck] = useState(true)

  const changeForm = () =>{
    setSignUpEmail('');
    setSignUpPassword('');
    setSignUpPasswordCheck('');
    setEmail('');
    setPassword('');
    setCheck(!check);
  }
  
  return (
    <Container  >
      { isRedirect && <Navigate to="/"/> }
        <div className={check ? "cont" : "cont s--signup"} style={{height:'550px'}}>
          <div className="form sign-in">
            <h2 style={{color:'white'}}>Welcome back</h2>
            <label>
              <span>E-mail</span>
              <input type="email" placeholder="E-mail" value={email}style={{backgroundColor:"rgba(0,0,0,0.3)", height:35, borderRadius: 2, color:'#c8c8c8'}}  id="email"onChange={(e) => {setEmail(e.target.value)}}/>
            </label>
            <label>
              <span>Password</span>
              <input type="password" placeholder="Password" value={password} style={{backgroundColor:"rgba(0,0,0,0.3)", height:35 ,borderRadius: 2, marginBottom:10, color:'#c8c8c8'}} id="password" onChange={(e) => {setPassword(e.target.value)}}/>
            </label>
            <Link style={{fontSize:15}} className="forgot-pass" to={`/findpassword`}>Forgot password?</Link>
            <span> {wrongInputData ? <div style={{color:'red'}}>존재하지 않는 이메일이거나 틀린 비밀번호입니다.</div>: <div style={{height:'18px'}}></div>}</span>
           
            <button  style={ { color:"rgba(240,240,240)", height:45 ,borderRadius: 2, backgroundColor:"rgba(80,0,0,0.7)"}}  type="button" className="submit" onClick={onClickLogin}>Sign In</button>
            {/* <img style={{width:'260px', cursor: 'pointer'}} src="kakao_login_large_narrow.png" onClick={clickKakaoLogin} /> */}
            <KaKaoLoginButton onClick={emailcheckModalOpen}><KakaoLogo src={'comment-solid.svg'} />카카오 로그인</KaKaoLoginButton>
            {/* <button type="button" className="fb-btn" style={{marginBottom:"16px"}} onClick={clickKakaoLogin}>Connect with <span style={{color:"yellow"}}>Kakao</span></button> */}

          </div>

          <Modal
            open={modalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-title"
          >
            <Box sx={{ ...styleModal, width: 450, backgroundColor:"rgba(30,30,30,0.7)"}}>
              <h2 id="modal-title">{modalMessage}</h2>
              <Button style={{width:100,
              position: 'relative', left:40,
                              border: 'solid 2px var(--color-2)',
                              color: 'var(--color-2)',
                              backgroundColor: 'var(--color-5)',
                              padding: '10px 10px',
                              borderRadius: '2px',
                              fontSize: '16px',
                              marginLeft: '25%',
                              marginTop:30,
                              cursor: 'pointer',
                              textDecoration: 'none',}} onClick={handleModalClose}>확인</Button>
            </Box>
          </Modal>
          <Modal
            open={emailcheck}
            onClose={emailcheckModalClose}
            aria-labelledby="modal-title">
            <Box sx={{ ...styleModal, border: '2px solid #999', width: 400, height:230, backgroundColor:'rgba(50,50,50,0.3)'}}>
              <h2 id="modal-title" sx={{textAlign:'center'}}>이메일 정보 동의를 <br/>필수적으로 선택해주세요</h2>
              <Button sx={{...middleButton, position:'relative', left:40, top:15}} onClick={clickKakaoLogin}>확인</Button>
              <Button sx={{...middleButton, position:'relative', left:40, top:15}} onClick={emailcheckModalClose}>취소</Button>
            </Box>

          </Modal>

          <div className="sub-cont">
            <div className="img">
              <div className="img__text m--up">
                <h2>New here?</h2>
                <p>Sign up and discover great amount of new opportunities!</p>
              </div>
              <div className="img__text m--in">
                <h2>One of us?</h2>
                <p>If you already has an account, just sign in. We've missed you!</p>
              </div>
              <div className="img__btn" onClick={changeForm}>
                <span className="m--up">Sign Up</span>
                <span className="m--in">Sign In</span>
              </div>
            </div>
            <div className="form sign-up">
              <h2 style={{color:'white'}}>Time to feel like home</h2>
              <label>
                <span>E-mail</span>
                <input type="text" placeholder="E-mail" value={signUpEmail} style={{backgroundColor:"rgba(0,0,0,0.3)", height:35, borderRadius: 2, color:'#c8c8c8'}} id="signUpEmail" onChange={(e) => {setIsValidEmail(false); setSignUpEmail(e.target.value);}}
                onBlur={() => {if (signUpEmail.length) checkEmail(); else handleModalOpen('이메일을 입력해주세요.');}}/>
                <div></div>
                {/* <Button style={styleButton} onClick={() => {if (signUpEmail.length) checkEmail(); else handleModalOpen('이메일을 입력해주세요.');}}>중복검사</Button> */}
              </label>
              <label>
                <span>Password validationPassword</span>
                <input type="password" placeholder="Password" value={signUpPassword} style={{backgroundColor:"rgba(0,0,0,0.3)", height:35, borderRadius: 2, color:'#c8c8c8'}} id="signUpPassword" onChange={(e) => {setSignUpPassword(e.target.value)}}
                onBlur={() => {if (validationPassword()) ; else handleModalOpen('소문자, 대문자, 숫자가 포함된 6자리이상 20자리 이하의 비밀번호를 입력해 주세요');}}/>
              </label>
              <label>
                <span>Check_Password</span>
                <input type="password" placeholder="Check_Password" value={signUpPasswordCheck} style={{backgroundColor:"rgba(0,0,0,0.3)", height:35, borderRadius: 2, color:'#c8c8c8'}} id="signUpPasswordCheck"onChange={(e) => {setSignUpPasswordCheck(e.target.value)}}/>
              </label>
              {!isSamePassword() ? <span className="forgot-pass">비밀번호가 다릅니다.</span> : null}

              <button style={{ height:45 ,borderRadius: 4, backgroundColor:"rgba(80,0,0,0.7)", color:"rgba(240,240,240)"}} type="button" className="submit" onClick={goEmailAuthPage}>Sign Up</button>
            </div>
          </div>
        </div>
    </Container>
  );
};

export default SignInPage;

const KaKaoLoginButton = styled.button`
  width: 260px;
  height: 46px;
  background-color: #FEE500;
  border-radius: 2px;
  color: #191919;
  font-weight: bold;
  justify-content: center;
  display: flex;
  align-items: center;
  padding: 0 20px;
`

const KakaoLogo = styled.img`
  width: 24px;
  margin: 0 16px 0 0;
`