import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from  "react-router-dom";
import { useDispatch } from "react-redux";
import { Container } from '../style.js';
import { login, getUser } from "../redux/slice/UserSlice";
import axios from 'axios';


const KakaoLoginPage = (props) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const code = searchParams.get('code')
    axios({
      method: 'get',
      url: 'https://i7d106.p.ssafy.io:8080/oauth/callback/kakao',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: {
        code,
      }
    })
    .then((response) => {
      dispatch(login({...response.data}));
      axios({
        method: 'get',
        url: '/api/user/me',
        headers: {
            Authorization: 'Bearer ' + response.data.accessToken,
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
      }
    })
  }, []);
  
  return(
    <Container>
      {/* 스피너 추가 */}
    </Container>
  );
};

export default KakaoLoginPage;