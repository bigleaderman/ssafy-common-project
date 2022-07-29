<<<<<<< HEAD
import React from "react";
import styled from "styled-components";
import "../style.js";
import { useNavigate } from "react-router-dom";
import { Button } from "../style.js";

const Header = (props) => {
    const navigate = useNavigate();
=======
import React from 'react';
import styled from 'styled-components';
import '../style.js';
import { useNavigate } from 'react-router-dom';
import { styleButton } from '../style.js';
import { Button } from '@mui/material';

const Header = (props) => {
  const navigate = useNavigate();
>>>>>>> 12cc2f7d2be64eef9fea24423475bd2009c5af06

    const goMainPage = () => {
        navigate("/");
    };
    const goSignUpPage = () => {
        navigate("/signup");
    };
    const goSignInPage = () => {
        navigate("/signin");
    };
    const goSignOutPage = () => {
        navigate("/signout");
    };
    const goMyPage = () => {
        navigate("/mypage");
    };
    const goUserListPage = () => {
        navigate("/userlist");
    };

<<<<<<< HEAD
    const goRoomPage = function() {
        navigate("/roompage");
    };

    function goGatherRoomPage() {
        navigate("/gatherroompage");
    }
    return (
        <Container>
            <Logo onClick={goMainPage}>
                <img src="logo.svg" alt="logo" />
                <p>모두의 마피아</p>
            </Logo>
            <Menu>
                <Button onClick={goSignUpPage}>회원가입</Button>
                <Button onClick={goSignInPage}>로그인</Button>
                <Button onClick={goSignOutPage}>로그아웃</Button>
                <Button onClick={goMyPage}>마이페이지</Button>
                <Button onClick={goUserListPage}>유저 관리</Button>
                <Button onClick={goRoomPage}>대기실</Button>
                <Button onClick={goGatherRoomPage}>게더룸</Button>
            </Menu>
        </Container>
    );
=======
  return (
    <HeaderContainer>
      <Logo onClick={goMainPage}>
        <img src="logo.svg" alt="logo" />
        <p>모두의 마피아</p>
      </Logo>
      <Menu>
        <Button style={styleButton} onClick={goSignUpPage}>회원가입</Button>
        <Button style={styleButton} onClick={goSignInPage}>로그인</Button>
        <Button style={styleButton} onClick={goSignOutPage}>로그아웃</Button>
        <Button style={styleButton} onClick={goMyPage}>마이페이지</Button>
        <Button style={styleButton} onClick={goUserListPage}>유저 관리</Button>
      </Menu>
    </HeaderContainer>
  );
>>>>>>> 12cc2f7d2be64eef9fea24423475bd2009c5af06
};

const HeaderContainer = styled.header`
    position: sticky;
    top: 0px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    text-align: center;
    align-items: center;
    padding: 0 40px 0 40px;
    height: 60px;
    background-color: var(--color-5);
    justify-content: space-between;
`

const Logo = styled.a`
    display: flex;
    flex-direction: row;
    cursor: pointer;

    img {
        display: block;
        width: 40px;
    }
    p {
        color: var(--color-2);
        font-size: 20px;
    }
`;

<<<<<<< HEAD
const Container = styled.section`
    overflow: hidden;
    display: flex;
    flex-direction: row;
    text-align: center;
    justify-content: space-between;
    align-items: center;

    padding: 0 40px 0 40px;
    height: 60px;
    background-color: var(--color-5);
`;

=======
>>>>>>> 12cc2f7d2be64eef9fea24423475bd2009c5af06
const Menu = styled.section`
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export default Header;
