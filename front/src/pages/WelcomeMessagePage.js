import React from "react";
import { Container, styleButton } from '../style.js';
import styled from 'styled-components';
import { Link } from  "react-router-dom";


const WelcomeMessagePage = (props) => {
  return (
    <Container>
      <Content>
        <div>
          <h4>환영합니다!</h4>
          <span>
          <p>모두의 마피아에 가입되었습니다.</p>
          </span>
        </div>
      </Content>
      <Link style={styleButton} to="/signin">로그인</Link>
    </Container>
  )
};

const Content = styled.div`
  overflow: hidden;
  display: block;
  text-align: center;
`

export default WelcomeMessagePage;